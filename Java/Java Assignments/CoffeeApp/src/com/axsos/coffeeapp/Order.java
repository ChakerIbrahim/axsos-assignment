package com.axsos.coffeeapp;

import java.util.ArrayList;

public class Order {
    private String customerName;
    private ArrayList<Item> items;

    public Order(String customerName) {
        this.customerName = customerName;
        this.items = new ArrayList<>();
    }

    public String getCustomerName() { return customerName; }
    public ArrayList<Item> getItems() { return items; }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public void printOrder() {
        System.out.println("Order for: " + customerName);
        double total = 0;
        for (Item item : items) {
            System.out.println("  - " + item.getName() + " -- $" + item.getPrice());
            total += item.getPrice();
        }
        System.out.println("Total: $" + total);
    }
}