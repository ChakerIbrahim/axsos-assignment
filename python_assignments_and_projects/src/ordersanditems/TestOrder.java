package ordersanditems;

public class TestOrder {
    public static void main(String[] args) {
        // Menu items
        Item item1 = new Item();
        item1.name = "mocha";
        item1.price = 3.5;
        Item item2 = new Item();
        item2.name = "latte";
        item2.price = 4.0;
        Item item3 = new Item();
        item3.name = "drip coffee";
        item3.price = 2.5;
        Item item4 = new Item();
        item4.name = "cappuccino";
        item4.price = 4.5;

        // Orders
        Order order1 = new Order();
        order1.name = "Rami";
        Order order2 = new Order();
        order2.name = "Jimmy";
        Order order3 = new Order();
        order3.name = "Noah";
        Order order4 = new Order();
        order4.name = "Sam";

        // Print order1 object
        System.out.println(order1);
        // Predict order1.total
        System.out.println(order1.total); // 0.0

        // Add mocha to Jimmy
        order2.items.add(item1);
        order2.total += item1.price;

        // Noah ordered cappuccino
        order3.items.add(item4);
        order3.total += item4.price;

        // Sam added latte
        order4.items.add(item2);
        order4.total += item2.price;

        // Rami's order is ready
        order1.ready = true;

        // Sam ordered 2 more lattes
        order4.items.add(item2);
        order4.items.add(item2);
        order4.total += item2.price * 2;

        // Jimmy's order is ready
        order2.ready = true;

        // Test output
        System.out.printf("Name: %s\n", order1.name);
        System.out.printf("Total: %s\n", order1.total);
        System.out.printf("Ready: %s\n", order1.ready);
        System.out.printf("Jimmy total: %s\n", order2.total);
        System.out.printf("Jimmy ready: %s\n", order2.ready);
        System.out.printf("Noah total: %s\n", order3.total);
        System.out.printf("Sam total: %s\n", order4.total);
    }
}