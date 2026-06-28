package abstractart;

import java.util.ArrayList;

public class Museum {
	public static void main(String[] args) {
		ArrayList<Art> museum = new ArrayList<Art>();
		
		Painting p1 = new Painting(
				"Starry Night",
				"Vincent van Gogh",
				"A swirling night sky over a village",
				"Oil"
				);
		Painting p2 = new Painting(
				"Mona Lisa",
				"Leonardo da Vinci",
				"Portrait of a woman with a mysterious smile",
				"Oil"
				);
		Painting p3 = new Painting(
				"Water Lilies",
				"Claude Monet",
				"Reflectiond of water lilies in a pond",
				"Watercolor"
				);
		Sculpture s1 = new Sculpture(
				"David",
				"Michelangelo",
				"A marble statue of the biblical hero David",
				"Marble"
				);
		Sculpture s2 = new Sculpture(
				"The Thinker",
				"Auguste Rodin",
				"A man in deep thought sitting on a rock",
				"Bronze"
				);
		
		museum.add(p1);
		museum.add(p2);
		museum.add(p3);
		museum.add(s1);
		museum.add(s2);
		
		
		for (Art art : museum) {
			art.viewArt();
			System.out.println();
		}
				
	}
}
