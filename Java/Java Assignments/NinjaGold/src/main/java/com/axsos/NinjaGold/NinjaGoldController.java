package com.axsos.NinjaGold;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Controller
public class NinjaGoldController {

    private static final Random random = new Random();
    private static final DateTimeFormatter TIMESTAMP_FORMAT =
            DateTimeFormatter.ofPattern("MMMM d, yyyy h:mm a");

    // Method 1: show the game (current gold + activity log)
    @GetMapping("/ninja-gold")
    public String showGame(HttpSession session, Model model) {
        Integer gold = (Integer) session.getAttribute("gold");
        if (gold == null) {
            gold = 0;
            session.setAttribute("gold", gold);
        }

        List<String> activities = (List<String>) session.getAttribute("activities");
        if (activities == null) {
            activities = new ArrayList<>();
            session.setAttribute("activities", activities);
        }

        model.addAttribute("gold", gold);
        model.addAttribute("activities", activities);
        return "ninja-gold";
    }

    // Method 2: handles ALL 4 forms - "place" hidden input tells them apart
    @PostMapping("/ninja-gold")
    public String findGold(@RequestParam("place") String place, HttpSession session) {
        Integer gold = (Integer) session.getAttribute("gold");
        if (gold == null) {
            gold = 0;
        }

        List<String> activities = (List<String>) session.getAttribute("activities");
        if (activities == null) {
            activities = new ArrayList<>();
        }

        String timestamp = LocalDateTime.now().format(TIMESTAMP_FORMAT);
        int change;
        String message;

        switch (place) {
            case "farm":
                change = 10 + random.nextInt(11); // 10-20 inclusive
                message = "You entered a farm and earned " + change + " gold. (" + timestamp + ")";
                break;
            case "cave":
                change = 5 + random.nextInt(6); // 5-10 inclusive
                message = "You entered a cave and earned " + change + " gold. (" + timestamp + ")";
                break;
            case "house":
                change = 2 + random.nextInt(4); // 2-5 inclusive
                message = "You entered a house and earned " + change + " gold. (" + timestamp + ")";
                break;
            case "quest":
                change = random.nextInt(101) - 50; // -50 to 50 inclusive
                if (change >= 0) {
                    message = "You completed a quest and earned " + change + " gold. (" + timestamp + ")";
                } else {
                    message = "You failed a quest and lost " + Math.abs(change) + " gold. Ouch. (" + timestamp + ")";
                }
                break;
            default:
                change = 0;
                message = "Unknown location.";
        }

        gold += change;
        activities.add(0, message); // newest entry on top, matching the wireframe

        session.setAttribute("gold", gold);
        session.setAttribute("activities", activities);

        return "redirect:/ninja-gold";
    }
}