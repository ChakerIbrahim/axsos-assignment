from datetime import date

from django import forms
from django.core.exceptions import ValidationError

from .models import Project


class ProjectForm(forms.ModelForm):
    """Create/edit form. Validation mirrors the wireframe's notes: project
    name >= 3 chars, description >= 10 chars, dates required. The "start
    date should be in present" rule is only enforced when creating a new
    project -- editing an in-flight project (which may have started in the
    past) is still allowed, matching the edit wireframe's example."""

    start_date = forms.DateField(
        label='Start date',
        widget=forms.DateInput(attrs={'type': 'date'}),
    )
    end_date = forms.DateField(
        label='End date',
        widget=forms.DateInput(attrs={'type': 'date'}),
    )

    class Meta:
        model = Project
        fields = ['name', 'tagline', 'description', 'start_date', 'end_date']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 5}),
        }

    def __init__(self, *args, require_future_start=False, **kwargs):
        self.require_future_start = require_future_start
        super().__init__(*args, **kwargs)
        self.fields['tagline'].required = False

    def clean_name(self):
        value = self.cleaned_data['name'].strip()
        if len(value) < 3:
            raise ValidationError('Project name should be at least 3 characters.')
        return value

    def clean_description(self):
        value = self.cleaned_data['description'].strip()
        if len(value) < 10:
            raise ValidationError('Description should be at least 10 characters.')
        return value

    def clean_start_date(self):
        value = self.cleaned_data['start_date']
        if self.require_future_start and value < date.today():
            raise ValidationError('The start date should be in the present (today or later).')
        return value

    def clean(self):
        cleaned = super().clean()
        start = cleaned.get('start_date')
        end = cleaned.get('end_date')
        if start and end and end < start:
            self.add_error('end_date', 'End date should be on or after the start date.')
        return cleaned
