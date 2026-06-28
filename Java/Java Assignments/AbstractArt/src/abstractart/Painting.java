package abstractart;

public class Painting extends Art {
	private String paintType;
	
	
	public Painting(String title, String author, String description, String paintType) {
		super(title, author, description);
		this.paintType = paintType;
	}
	
	@Override
	public void viewArt() {
		System.out.println("=== PAINTING ===");
		System.out.println("Title:" + getTitle());
		System.out.println("Author:" + getAuthor());
		System.out.println("Description:" + getDescription());
		System.out.println("Paint type:" + paintType);
		System.out.println("=============");
		
	}
	
	public String getpaintType() {
		return paintType;
	}
	public void setPainttype(String paintType) {
		this.paintType = paintType;
	}
}
