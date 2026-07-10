package com.chaker.authentication.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.chaker.authentication.services.CategoryService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

// @Controller: an MVC controller that returns JSP views
@Controller
public class HomeController {
    @GetMapping("/teams/{id}/delete")
    public String deleteTeam(@PathVariable("id") Long id){
        Team team = teamService.findTeam(id);
        for(Player player:team.getPlayers()){
            player.setTeam(null);
            playerService.updatePlayer(player);
        }

        for(Coach coach:team.getCoaches()){
            coach.setteam(null);
            coachService.updateCoach(coach);
        }

        for(Fan fan:team.getFans()){
            fan.getTeams().remove(team);
            fanService.updateFan(fan);
        }

        teamService.deleteTeam(team);
        return "index.jsp";
    }
}