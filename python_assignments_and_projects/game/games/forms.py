from datetime import date

from django import forms

from .models import Game


class GameForm(forms.ModelForm):
    class Meta:
        model = Game
        fields = ['name', 'genre', 'release_date', 'description']
        widgets = {
            'release_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }

    def clean_name(self):
        name = self.cleaned_data['name'].strip()
        if len(name) < 2:
            raise forms.ValidationError('Game name should be at least 2 characters.')
        return name

    def clean_release_date(self):
        release_date = self.cleaned_data['release_date']
        if release_date > date.today():
            raise forms.ValidationError('Release date should not be in the future.')
        return release_date

    def clean_description(self):
        description = self.cleaned_data['description'].strip()
        if not description:
            raise forms.ValidationError('Description should not be blank.')
        return description
