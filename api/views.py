# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from datetime import datetime, timedelta

from .models import AvailableChange

# Create your views here.
def test(request):
    
    price_per_hour = 2
    
    available_change = AvailableChange.objects.get(pk=1)
    
    now = request.POST.get('now', datetime.now())
    access_time = request.POST.get('access_time', datetime.now() - timedelta(hours = 2))
    
    user_payment = 6

    duration = now - access_time
    
    duration_in_s = duration.total_seconds() 
    
    duration_in_h = (duration_in_s / 3600)
    
    payment_due = int(price_per_hour * duration_in_h)
    
    payment_change = int(user_payment - payment_due)
    
    print(payment_change, 'hours', payment_due)
    
    while payment_change > 0:
        
        print(payment_change, payment_change // available_change.two)
        
        if payment_change // (available_change.hundred * 100) >= 1:
            
            payment_change -= 100 * (payment_change // available_change.hundred)
            
            available_change.hundred -= payment_change
            
        elif payment_change // (available_change.fifty * 50) >= 1:
            
            payment_change -= 50 * (payment_change // available_change.fifty)

        elif payment_change // (available_change.five * 5) >= 1:
            
            payment_change -= 5 * (payment_change // available_change.five)
            
            print('aye')

        elif payment_change // (available_change.two * 2) >= 1:
            
            print('ok')
            
            payment_change -= 2 * (payment_change // available_change.two)

        elif payment_change // (available_change.one * 1) >= 1:
            
            print('hmm', payment_change)
            
            payment_change -= 1 * (payment_change // available_change.one)
        
        else:
            
            return JsonResponse({'error': "Unavaiable change"})
    
    available_change.save()
    
    return JsonResponse({'change': payment_change})
    
def available_change(request):
    
    available_change = AvailableChange.objects.get(pk=1)
    
    return JsonResponse({
        'one': available_change.one, 
        'two': available_change.two, 
        'five': available_change.five,
        'fifty': available_change.fifty,
        'hundred': available_change.hundred
    })
