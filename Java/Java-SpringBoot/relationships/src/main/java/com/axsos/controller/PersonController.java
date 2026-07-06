package com.axsos.controller;

@GetMapping("/persons/{person_id}")
public String showPerson(@PathVariable Long person_id, Model model) {
	
	Person someAwesomePerson = personService.findbyId(person_id);
	model.addAttribute("person", someAwesomePerson);
	
	return "showPerson.jsp";
}

@Postmapping("/licenses")
public String licenses(@Valid @ModelAttribute("license") License license) {
	licenseService.creaye(license);
	
	return "redirect:/persons";
}
