package com.axsos.barista;
import java.util.ArrayList;

public class Order {
    private String name;
    private boolean ready;
    private ArrayList<Items> items;

    public Order(String name) {         // no-arg ready, defaults to false
        this.name = name;
        this.ready = false;
        this.items = new ArrayList<Items>();
    }

    public Order(String name, boolean ready) {
        this.name = name;
        this.ready = ready;
        this.items = new ArrayList<Items>();
    }

    public String getName() { return name; }
    public boolean getReady() { return ready; }
    public ArrayList<Items> getItems() { return items; }

    public void setName(String name) { this.name = name; }
    public void setReady(boolean ready) { this.ready = ready; }
    public void setItems(ArrayList<Items> items) { this.items = items; }

    public void additem(Items item) {
        this.items.add(item);
    }

    public String getStatusMessage() {
        if (this.ready == true) {
            return "Your order is ready!";
        } else {
            return "Thank you for waiting, your order will be ready soon!";
        }
    }

    public double getOrderTotal() {
        double total = 0;
        for (int i = 0; i < items.size(); i++) {
            total += items.get(i).getPrice();
        }
        return total;
    }

    public void display() {
        System.out.println("Customer Name: " + this.name);
        for (int i = 0; i < items.size(); i++) {
            System.out.println(items.get(i).getName() + " - $" + items.get(i).getPrice());
        }
        System.out.println("Total: $" + this.getOrderTotal()); 
    }
}