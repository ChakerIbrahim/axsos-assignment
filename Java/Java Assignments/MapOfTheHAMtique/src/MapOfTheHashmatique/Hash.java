package MapOfTheHashmatique;

import java.util.HashMap;
import java.util.Map;

public class Hash {
	public static void main(String[]args) {
	 HashMap<String, String> musicLyrics = new HashMap<>();
	 
	 musicLyrics.put("Not Afraid", " I am not Afraid" );
	 musicLyrics.put("Real Slim Shade" , "i am the real slime shade");
	 musicLyrics.put("Lovely" , "Is in't lovely?");
	 musicLyrics.put("Chihiro" , "Huuuuu huu");
	 
	 musicLyrics.get("Not Afraid");
	 String lyric = musicLyrics.get("Not Afraid");
	 System.out.println("Track: Not Afraid | Lyrics: " + lyric);
	 
	 for (Map.Entry<String, String> entry : musicLyrics.entrySet()) {
         System.out.println("Track: " + entry.getKey() + " | Lyrics: " + entry.getValue());
	 }
	 
	 
}
}