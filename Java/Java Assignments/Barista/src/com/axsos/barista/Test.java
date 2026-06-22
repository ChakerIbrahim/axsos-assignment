package com.axsos.barista;

public class Test {
    public static void main(String[] args) {
        Items dripCoffee = new Items("Drip Coffee", 1.50);
        Items cappuccino = new Items("Cappuccino", 3.50);

        Order order1 = new Order("Guest");    
        Order order2 = new Order("Jalil");

        order1.additem(dripCoffee);
        order1.additem(cappuccino);

        System.out.println(order1.getOrderTotal());

        order1.setReady(true);
        System.out.println(order1.getStatusMessage());

        order1.display();
    }
}
