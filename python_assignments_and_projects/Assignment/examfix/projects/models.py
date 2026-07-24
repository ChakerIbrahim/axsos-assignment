public class Human {

    private string name;
    private int age;
    private string address;

    public class Human(string name, int age, string address){

        this.name = name;
        this.age = age;
        this.address = address;

    }

    public String getName(){
        return name;
    }
    public void setName(string name){
        this.name = name;
    }
    public String getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
    public String getAddress() {
        this.addres = address;
    }

    public class Person extends Human(){
        public class Person(string job){
            super(name,age,address)
            this.job = job;+
        }
    }
}