package com.axsos.coffeeapp;

import java.util.ArrayList;
import java.util.Scanner;

public class CoffeeKiosk {

    private ArrayList<Item> menu;
    private ArrayList<Order> orders;
    private Scanner scanner = new Scanner(System.in);

    public CoffeeKiosk() {
        this.menu = new ArrayList<>();
        this.orders = new ArrayList<>();
    }

    public void addMenuItem(String name, double price) {
        Item newItem = new Item(name, price);
        newItem.setIndex(menu.size());
        menu.add(newItem);
    }

    public void displayMenu() {
        for (Item item : menu) {
            System.out.println(item.getIndex() + " " + item.getName() + " -- $" + item.getPrice());
        }
    }

    public void newOrder() {
        System.out.println("Please enter customer name for new order:");
        String name = scanner.nextLine(); // ← changed

        Order order = new Order(name);

        displayMenu();

        System.out.println("Please enter a menu item index or q to quit:");
        String itemNumber = scanner.nextLine(); // ← changed

        while (!itemNumber.equals("q")) {
            int index = Integer.parseInt(itemNumber);
            Item selectedItem = menu.get(index);
            order.addItem(selectedItem);

            System.out.println("Please enter a menu item index or q to quit:");
            itemNumber = scanner.nextLine(); // ← changed
        }

        order.printOrder();
        orders.add(order);
    }
}