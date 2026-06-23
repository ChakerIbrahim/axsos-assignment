package CafeJava;

public class CafeJava {
    public static void main(String[] args) {
        // APP VARIABLES
        String generalGreeting = "Welcome to Cafe Java, ";
        String pendingMessage = ", your order will be ready shortly";
        String readyMessage = ", your order is ready";
        String displayTotalMessage = "Your total is $";

        // Menu variables
        double mochaPrice = 3.5;
        double coffeePrice = 5;
        double capucinoPrice = 2.5;
        double nescafePrice = 8;
        double dripCoffeePrice = 3.0;   
        double lattePrice = 4.5;
        double cappuccinoPrice = 6.0;

        // Customer name variables
        String customer1 = "Shatha";
        String customer2 = "Chaker";
        String customer3 = "Aws";
        String customer4 = "Adel";
        String customer5 = "Ahmad";     
        String customer6 = "Sail";
        String customer7 = "Adam";

        // Order completions
        boolean isReadyOrder1 = false;
        boolean isReadyOrder2 = true;
        boolean isReadyOrder3 = false;
        boolean isReadyOrder4 = true;
        boolean isReadyOrder5 = true;   
        boolean isReadyOrder6 = false;  
        boolean isReadyOrder7 = true;   

        // APP INTERACTION SIMULATION

        
        System.out.println(generalGreeting + customer1);

        
        System.out.println(customer2 + pendingMessage);
        System.out.println(customer3 + readyMessage);

       
        System.out.println(customer4 + " " + displayTotalMessage + coffeePrice);

        // Sail ordered a coffee 
        if (isReadyOrder6) {
            System.out.println(customer6 + readyMessage);
        } else {
            System.out.println(customer6 + pendingMessage);
        }

        // Ahmad ordered a cappuccino - if ready, also print total
        if (isReadyOrder5) {
            System.out.println(customer5 + readyMessage);
            System.out.println(customer5 + " " + displayTotalMessage + cappuccinoPrice);
        } else {
            System.out.println(customer5 + pendingMessage);
        }

        // Sail ordered 2 lattes - print total, then flip isReady
        double sailTotal = lattePrice * 2;
        System.out.println(customer6 + " " + displayTotalMessage + sailTotal);
        isReadyOrder6 = !isReadyOrder6; // flips false → true
        System.out.println(customer6 + (isReadyOrder6 ? readyMessage : pendingMessage));

        // Adam was charged for coffee but ordered a latte - print total
        double adamDifference = lattePrice - dripCoffeePrice;
        System.out.println(customer7 + " " + displayTotalMessage + adamDifference + " more");
    }
}