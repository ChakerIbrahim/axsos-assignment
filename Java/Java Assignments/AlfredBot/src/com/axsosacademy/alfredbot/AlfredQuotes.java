package com.axsosacademy.alfredbot;
import java.util.Date;

public class AlfredQuotes {
    
    public String basicGreeting() {
        // You do not need to code here, this is an example method
        return "Hello, lovely to see you. How are you?";
    }
    
    public String guestGreeting(String name) {
       
        return "Hello" + name + "Nice to see you !";
    }
    
    public String dateAnnouncement(int date) {
        // YOUR CODE HERE
        return "today is ...." + date;
    }
    
    public String respondBeforeAlexis(String conversation) {
        // YOUR CODE HERE
        return "i am faster than Alexis";
    }
    
    // NINJA BONUS
    // See the specs to overload the guestGreeting method
        // SENSEI BONUS
        // Write your own AlfredQuote method using any of the String methods you have learned!
}