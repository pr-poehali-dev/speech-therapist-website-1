import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Provide download links for educational materials
    Args: event with httpMethod and queryStringParameters (material_id)
    Returns: HTTP response with file download or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {})
    material_id = params.get('id', '')
    
    # Material database
    materials = {
        'articulation': {
            'name': 'Артикуляционная гимнастика',
            'filename': 'artikulyacionnaya-gimnastika.pdf',
            'size': '2.4 MB',
            'description': 'Комплекс упражнений для развития речевого аппарата'
        },
        'games': {
            'name': 'Логопедические игры',
            'filename': 'logopedicheskie-igry.pdf',
            'size': '3.8 MB',
            'description': '30+ игр для развития речи детей 3-7 лет'
        },
        'tongue-twisters': {
            'name': 'Чистоговорки и скороговорки',
            'filename': 'chistogovorki-skorogovorki.pdf',
            'size': '1.2 MB',
            'description': 'Подборка для автоматизации всех звуков'
        },
        'workbooks': {
            'name': 'Рабочие тетради',
            'filename': 'rabochie-tetradi.pdf',
            'size': '4.5 MB',
            'description': 'Задания для развития фонематического слуха'
        },
        'breathing': {
            'name': 'Дыхательная гимнастика',
            'filename': 'dykhatelnaya-gimnastika.pdf',
            'size': '1.8 MB',
            'description': 'Упражнения для развития речевого дыхания'
        }
    }
    
    if not material_id:
        # Return list of all materials
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'materials': materials,
                'total': len(materials)
            })
        }
    
    if material_id not in materials:
        return {
            'statusCode': 404,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Material not found'})
        }
    
    material = materials[material_id]
    
    # In real implementation, this would return actual file download
    # For now, return material info with download URL placeholder
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'id': material_id,
            'name': material['name'],
            'filename': material['filename'],
            'size': material['size'],
            'description': material['description'],
            'download_url': f'/api/download?id={material_id}',
            'message': 'Материал готов к скачиванию'
        })
    }
