from django import forms
from django.utils import timezone
from .models import Show


class ShowForm(forms.ModelForm):
    # Make description optional (NINJA BONUS)
    description = forms.CharField(
        widget=forms.Textarea,
        required=False,
        min_length=10,
        error_messages={
            'min_length': 'Description must be at least 10 characters if provided.'
        }
    )

    class Meta:
        model = Show
        fields = ['title', 'network', 'release_date', 'description']
        widgets = {
            'release_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def __init__(self, *args, **kwargs):
        # Accept an optional instance kwarg so we can exclude self on edit (SENSEI BONUS)
        self.instance_pk = kwargs.get('instance').pk if kwargs.get('instance') else None
        super().__init__(*args, **kwargs)

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if not title:
            raise forms.ValidationError('Title is required.')
        if len(title) < 2:
            raise forms.ValidationError('Title must be at least 2 characters.')
        return title

    def clean_network(self):
        network = self.cleaned_data.get('network')
        if not network:
            raise forms.ValidationError('Network is required.')
        if len(network) < 3:
            raise forms.ValidationError('Network must be at least 3 characters.')
        return network

    def clean_release_date(self):
        release_date = self.cleaned_data.get('release_date')
        if not release_date:
            raise forms.ValidationError('Release Date is required.')
        # NINJA BONUS: Release date must be in the past
        if release_date >= timezone.now().date():
            raise forms.ValidationError('Release Date must be in the past.')
        return release_date

    def clean_description(self):
        description = self.cleaned_data.get('description')
        # Description is optional (NINJA BONUS), but if provided must be >= 10 chars
        if description and len(description) < 10:
            raise forms.ValidationError('Description must be at least 10 characters if provided.')
        return description

    def clean(self):
        cleaned_data = super().clean()
        title = cleaned_data.get('title')

        # SENSEI BONUS: Validate uniqueness of title
        if title:
            qs = Show.objects.filter(title__iexact=title)
            if self.instance_pk:
                qs = qs.exclude(pk=self.instance_pk)
            if qs.exists():
                self.add_error('title', 'A TV show with this title already exists in the database.')

        return cleaned_data
