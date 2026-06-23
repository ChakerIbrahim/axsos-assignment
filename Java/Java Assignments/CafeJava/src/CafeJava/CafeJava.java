package CafeJava;

public class CafeJava {
    public static void main(String[] args) {
        // APP VARIABLES
        // Lines of text that will appear in the app. 
        String generalGreeting = "Welcome to Cafe Java, ";
        String pendingMessage = ", your order will be ready shortly";
        String readyMessage = ", your order is ready";
        String displayTotalMessage = "Your total is $";
        
        // Menu variables (add yours below)
        double mochaPrice = 3.5;
        double coffeePrice = 5;
        double capucinoPrice = 2.5;
        double nescafePrice = 8;
    
        // Customer name variables (add yours below)
        String customer1 = "Shatha";
        String customer2 = "Chaker";
        String customer3 = "Aws";
        String customer4 = "Adel";
    
        // Order completions (add yours below)
        boolean isReadyOrder1 = false;
        boolean isReadyOrder2 = true;
        boolean isReadyOrder3 = false;
        boolean isReadyOrder4 = true;
    
        // APP INTERACTION SIMULATION (Add your code for the challenges below)
        // Example:
        System.out.println(generalGreeting + customer1); // Displays "Welcome to Cafe Java, Shatha"
        // ** Your customer interaction print statements will go here ** //
        System.out.println(pendingMessage + customer2);
        System.out.println(readyMessage + customer3);
        System.out.println(customer4 + displayTotalMessage);
    }
}