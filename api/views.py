# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

from datetime import datetime, timedelta

from .models import AvailableChange

import json

def parse_int(s, base=10):
    if s.isdigit():
        return int(s, base)
    else:
        return 0

# Create your views here.
def save_payment(request):
    
    data = json.loads(request.body)
    
    print(data)
    
    total_cost = data['totalCost']
    
    available_change = AvailableChange.objects.get(pk=1)
    
    payment = parse_int(data['oneChange']) * 1 + parse_int(data['twoChange']) * 2 + parse_int(data['tenChange']) * 10 + parse_int(data['fiftyChange']) * 50 + parse_int(data['hundredChange']) * 100
    
    payment_change = payment - total_cost
            
    print(payment, total_cost, payment - total_cost, 'change')
    
    if payment - total_cost:
    
        while total_cost > 0:
            
            if parse_int(data['hundredChange']) >= 1 : 
                
                total_cost -= 100 * parse_int(data['hundredChange'])
                
                available_change.hundred += parse_int(data['hundredChange'])
                
            if  parse_int(data['fiftyChange']) >= 1:
                
                total_cost -= 50 *  parse_int(data['fiftyChange'])
                
                available_change.fifty += parse_int(data['fiftyChange'])

            if  parse_int(data['tenChange']) >= 1:
                
                print(data['tenChange'], 'wtf')
                
                total_cost -= 10 *  parse_int(data['tenChange'])

                available_change.ten +=  parse_int(data['tenChange'])

            if  parse_int(data['twoChange']) >= 1:
                
                print('ye')
                
                total_cost -= 2 *  parse_int(data['twoChange'])
                
                available_change.two +=  parse_int(data['twoChange'])

            if  parse_int(data['oneChange']) >= 1:
                
                total_cost -= 1 *  parse_int(data['oneChange'])
                
                available_change.one +=  parse_int(data['oneChange'])
                
    
    print('payment_change', payment_change)


    while payment_change > 0:
        
        print(payment_change)
        
        if payment_change // 100 >= 1:
            
            available_change.hundred -= payment_change // 100
            
            payment_change -= 100 * (payment_change // 100)

        elif payment_change // 50 >= 1:
            
            available_change.fifty -= payment_change // 50
            
            payment_change -= 50 * (payment_change // 50)

        elif payment_change // 10 >= 1:
            
            print('rip')
            
            available_change.ten -= payment_change // 10
            
            payment_change -= 10 * (payment_change // 10)

        elif payment_change // 2 >= 1:
            
            print('oki')
            
            available_change.two -= payment_change // 2
            
            payment_change -= 2 * (payment_change // 2)

        elif payment_change // 1 >= 1:
            
            available_change.one -= payment_change // 1
            
            payment_change -= 1 * (payment_change // 1)
        
        else:
            
            return JsonResponse({'error': "Unavaiable change"})
    
        
    available_change.save()
        
    return JsonResponse({
        'oneChange': available_change.one, 
        'twoChange': available_change.two, 
        'tenChange': available_change.ten, 
        'fiftyChange': available_change.fifty, 
        'hundredChange': available_change.hundred
    })


def get_change(request):
    
    available_change = AvailableChange.objects.get(pk=1)
    
    return JsonResponse({
        'one': available_change.one, 
        'two': available_change.two, 
        'ten': available_change.ten,
        'fifty': available_change.fifty,
        'hundred': available_change.hundred
    })
