# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class AvailableChange(models.Model):

    one = models.IntegerField()
    two = models.IntegerField()
    five = models.IntegerField()
    fifty = models.IntegerField()
    hundred = models.IntegerField()
    
    def __unicode__(self):
        return "Available change is " + str(self.one) + ' ' + str(self.two) + ' ' + str(self.five) + ' ' + str(self.fifty) + ' ' + str(self.hundred)