from django import forms

from .models import Show


class ShowForm(forms.ModelForm):
    class Meta:
        model = Show
        fields = ['title', 'network', 'release_date', 'description']
        widgets = {
            'release_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 4}),
        }
