package com.chaker.gamesfsd.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.chaker.gamesfsd.models.Game;
import com.chaker.gamesfsd.models.User;
import com.chaker.gamesfsd.services.FavoriteService;
import com.chaker.gamesfsd.services.GameService;
import com.chaker.gamesfsd.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// Controller for the dashboard, games CRUD, favorites and profile
@Controller
public class GameController {

    // This controller needs all three services
    @Autowired
    private GameService gameServ;

    @Autowired
    private UserService userServ;

    @Autowired
    private FavoriteService favoriteServ;

    // GET /dashboard : Welcome + Create a Game form + games table.
    // ?sort=title|genre|date sorts the table when a column is clicked.
    @GetMapping("/dashboard")
    public String dashboard(@ModelAttribute("game") Game game,
            @RequestParam(value = "sort", required = false) String sort,
            HttpSession session, Model model) {

        // Guard: only logged-in users can see this page
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // The logged-in user ("Welcome Ibrahim khalil")
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userServ.findUserById(userId));

        // The games table, sorted according to the clicked column
        model.addAttribute("games", gameServ.allGames(sort));

        return "dashboard.jsp";
    }

    // POST /games : receives the Create a Game form
    @PostMapping("/games")
    public String createGame(@Valid @ModelAttribute("game") Game game,
            BindingResult result, HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");

        // If validations failed, re-render the dashboard - and refill
        // everything the page needs (user + games table)!
        if (result.hasErrors()) {
            model.addAttribute("user", userServ.findUserById(userId));
            model.addAttribute("games", gameServ.allGames(null));
            return "dashboard.jsp";
        }

        // Attach the logged-in user as the creator of this game
        // (fills the creator_id foreign key)
        game.setCreator(userServ.findUserById(userId));
        gameServ.createGame(game);

        return "redirect:/dashboard";
    }

    // GET /game/{id} : the Game Info page (wireframe URL /game/4)
    @GetMapping("/game/{id}")
    public String gameInfo(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userServ.findUserById(userId));

        // The game to display: its info, its creator, and (through the
        // favorites relationship) the players who like this game + rates
        model.addAttribute("game", gameServ.findGame(id));

        // The JSP compares this with game.creator.id so the
        // Edit and Delete buttons appear for the creator only
        model.addAttribute("userId", userId);

        return "gameinfo.jsp";
    }

    // POST /game/{id}/favorite : the "Add To Fav" button + Rate dropdown.
    // The rate arrives as a simple request parameter (not data binding),
    // so we grab it with @RequestParam.
    @PostMapping("/game/{id}/favorite")
    public String addFavorite(@PathVariable("id") Long id,
            @RequestParam("rate") int rate, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");
        User user = userServ.findUserById(userId);
        Game game = gameServ.findGame(id);

        // The service creates the Favorite row (or ignores duplicates)
        favoriteServ.addFavorite(user, game, rate);

        return "redirect:/game/" + id;
    }

    // GET /edit/game/{id} : the Edit Game page (wireframe URL),
    // pre-populated with the existing values for the game
    @GetMapping("/edit/game/{id}")
    public String editGame(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Game game = gameServ.findGame(id);

        // Guard: only the creator of the game can edit it -
        // hiding the button isn't enough, someone could type the URL
        Long userId = (Long) session.getAttribute("userId");
        if (!game.getCreator().getId().equals(userId)) {
            return "redirect:/dashboard";
        }

        model.addAttribute("user", userServ.findUserById(userId));
        // Passing the existing game pre-populates the form
        model.addAttribute("game", game);
        return "editgame.jsp";
    }

    // PUT /games/{id} : receives the edit form (Apply button).
    // Validations: same as for create.
    @PutMapping("/games/{id}")
    public String updateGame(@PathVariable("id") Long id,
            @Valid @ModelAttribute("game") Game game,
            BindingResult result, HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        Long userId = (Long) session.getAttribute("userId");

        // If validations failed, re-render the edit page
        if (result.hasErrors()) {
            model.addAttribute("user", userServ.findUserById(userId));
            return "editgame.jsp";
        }

        // The submitted "game" only carries the form fields.
        // Fetch the ORIGINAL game and copy the relationships across,
        // so editing never wipes the creator or the timestamps
        // (the favorites live on their own rows, so they are safe).
        Game original = gameServ.findGame(id);

        game.setId(id);                             // keep the id -> UPDATE
        game.setCreator(original.getCreator());     // keep the creator
        game.setCreatedAt(original.getCreatedAt()); // keep the timestamp

        gameServ.updateGame(game);
        return "redirect:/game/" + id;
    }

    // DELETE /games/{id} : the Delete button
    @DeleteMapping("/games/{id}")
    public String deleteGame(@PathVariable("id") Long id, HttpSession session) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // Guard: only the creator of the game can delete it
        Game game = gameServ.findGame(id);
        Long userId = (Long) session.getAttribute("userId");
        if (game.getCreator().getId().equals(userId)) {
            gameServ.deleteGame(id);
        }

        return "redirect:/dashboard";
    }

    // GET /profile/{id} : the Profile page (Player Info + Favourite Games)
    @GetMapping("/profile/{id}")
    public String profile(@PathVariable("id") Long id,
            HttpSession session, Model model) {

        // Guard: only logged-in users
        if (session.getAttribute("userId") == null) {
            return "redirect:/";
        }

        // The logged-in user (for the Welcome header)
        Long userId = (Long) session.getAttribute("userId");
        model.addAttribute("user", userServ.findUserById(userId));

        // The profile being viewed: their info + their favorites list
        // (each favorite row leads to its game with dot notation)
        model.addAttribute("player", userServ.findUserById(id));

        return "profile.jsp";
    }
}
