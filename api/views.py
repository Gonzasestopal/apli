# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from datetime import datetime, timedelta

from .models import AvailableChange

from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
def save_payment(request):
    
    price_per_hour = 2
    
    available_change = AvailableChange.objects.get(pk=1)
    
    now = request.POST.get('now', datetime.now())
    access_time = request.POST.get('access_time', datetime.now() - timedelta(hours = 2))
    
    user_payment = request.POST.get('payment', 6)

    duration = now - access_time
    
    duration_in_s = duration.total_seconds() 
    
    duration_in_h = int(round(duration_in_s / 3600)) # 2 for now
    
    total_cost = int(price_per_hour * duration_in_h)
    
    payment_change = abs(int(total_cost - user_payment))
    
    while total_cost > 0:
        
        if available_change.total_cost // (available_change.hundred * 100) >= 1: 
            
            total_cost -= 100 * (total_cost // available_change.hundred)
            
            available_change.hundred = total_cost // available_change.hundred
            
        elif available_change.fifty and total_cost // (available_change.fifty * 50) >= 1:
            
            total_cost -= 50 * (total_cost // available_change.fifty)
            
            available_change.fifty = total_cost // available_change.fifty

        elif available_change.five and total_cost // (available_change.five * 5) >= 1:
            
            total_cost -= 5 * (total_cost // available_change.five)

            available_change.five = total_cost // available_change.five

        elif available_change.two and total_cost // (available_change.two * 2) >= 1:
            
            total_cost -= 2 * (total_cost // available_change.two)
            
            available_change.two = total_cost // available_change.two

        elif available_change.one and total_cost // (available_change.one * 1) >= 1:
            
            total_cost -= 1 * (total_cost // available_change.one)
            
            available_change.one -= total_cost // available_change.one
        
        else:
            
            return JsonResponse({'error': "Unavaiable change"})
    
    available_change.save()
    
    return JsonResponse({'change': payment_change})

@csrf_exempt    
def get_change(request):
    
    available_change = AvailableChange.objects.get(pk=1)
    
    return JsonResponse({
        'one': available_change.one, 
        'two': available_change.two, 
        'ten': available_change.five,
        'fifty': available_change.fifty,
        'hundred': available_change.hundred
    })
