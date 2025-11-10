import json
import base64
from typing import Dict, Any
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.pdfgen import canvas
from io import BytesIO

def draw_text_latin(pdf: canvas.Canvas, x: float, y: float, text: str, font: str = "Helvetica", size: int = 10):
    '''Draw text transliterated to Latin'''
    transliteration = {
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
        'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
        'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    }
    latin_text = ''.join(transliteration.get(c, c) for c in text)
    pdf.setFont(font, size)
    pdf.drawString(x, y, latin_text)

def generate_articulation_pdf(pdf: canvas.Canvas, width: float, height: float):
    '''Generate articulation exercises PDF content'''
    y = height - 3*cm
    
    draw_text_latin(pdf, 2*cm, y, "ARTIKULYATSIONNAYA GIMNASTIKA", "Helvetica-Bold", 20)
    y -= 1*cm
    
    draw_text_latin(pdf, 2*cm, y, "Kompleks uprazhneniy dlya razvitiya rechevogo apparata", "Helvetica", 12)
    y -= 1.5*cm
    
    exercises = [
        ("1. ULYBKA (Smile)", "Rastyanut guby v shirokoy ulybke, zuby vidny. Derzhat 5-7 sekund."),
        ("2. TRUBOCHKA (Tube)", "Vytynut guby vpered trubochkoy. Derzhat 5-7 sekund."),
        ("3. LOPATA (Shovel)", "Shiroko otkryt rot, polozit rasslablennyy yazyk na nizhnuyu gubu."),
        ("4. IGOLKA (Needle)", "Otkryt rot, vytynut ostryy yazyk vpered. Derzhat 5 sekund."),
        ("5. CHASIKI (Clock)", "Otkryt rot, tyanut yazyk to k levomu, to k pravomu uglu rta."),
        ("6. KACHELIE (Swing)", "Podniat yazyk za verkhnie zuby, opustit za nizhnie. Povtorit 10 raz."),
        ("7. LOSHAD (Horse)", "Tsokat yazykom, imitiruya stuk kopyt. Povtorit 10-15 raz."),
        ("8. GRIBOCHEK (Mushroom)", "Prissosat yazyk k nebu, otkryt rot shiroke. Derzhat 5 sekund."),
    ]
    
    for title, description in exercises:
        if y < 4*cm:
            pdf.showPage()
            y = height - 3*cm
        
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(2*cm, y, title)
        y -= 0.6*cm
        
        pdf.setFont("Helvetica", 10)
        pdf.drawString(2.5*cm, y, description)
        y -= 1*cm
    
    # Recommendations
    if y < 6*cm:
        pdf.showPage()
        y = height - 3*cm
    
    y -= 0.5*cm
    draw_text_latin(pdf, 2*cm, y, "REKOMENDATSII:", "Helvetica-Bold", 12)
    y -= 0.8*cm
    
    recommendations = [
        "- Vypolnyat uprazhneniya pered zerkalom",
        "- Delat gimnastiku kazhdyy den 2 raza (utrom i vecherom)",
        "- Kazhdoe uprazhnenie vypolnyat 5-7 raz",
        "- Ne toropitsya, vazhno kachestvo, a ne skorost",
    ]
    
    pdf.setFont("Helvetica", 10)
    for rec in recommendations:
        pdf.drawString(2.5*cm, y, rec)
        y -= 0.6*cm

def generate_games_pdf(pdf: canvas.Canvas, width: float, height: float):
    '''Generate speech games PDF content'''
    y = height - 3*cm
    
    draw_text_latin(pdf, 2*cm, y, "LOGOPEDICHESKIE IGRY", "Helvetica-Bold", 20)
    y -= 1*cm
    
    draw_text_latin(pdf, 2*cm, y, "30+ igr dlya razvitiya rechi detey 3-7 let", "Helvetica", 12)
    y -= 1.5*cm
    
    games = [
        ("Nazvat odno slovo", "3-4 goda", "Vzroslyy nazyvaet slovo, rebenok nazyvaet drugoe slovo na tu zhe temu."),
        ("Skazi naoborot", "4-5 let", "Vzroslyy: 'Bol'shoy', rebenok: 'Malen'kiy'. Uchim antonomy."),
        ("Chego ne stalo?", "3-5 let", "Razlozhit 4-5 predmetov, rebenok zapominaet. Ubrat 1 predmet - ugadat kakoj."),
        ("Volshebnyi meshochek", "3-6 let", "V meshke predmety, rebenok na oshchup' ugadyvaet chto eto."),
        ("Nazovi laskovo", "3-5 let", "Dom - domik, koshka - koshechka. Uchim umenshitel'no-laskatel'nye formy."),
        ("Odin - mnogo", "3-5 let", "Yabloko - yabloki, stul - stul'ya. Uchim mnozhestvennoe chislo."),
        ("Chetvertyy lishniy", "4-7 let", "4 kartinki, 3 iz odnoy gruppy, 1 - iz drugoy. Naiti lishnyuyu."),
        ("Slogovye dorozhki", "4-6 let", "Hlopat' v ladoshi na kazhdyy slog v slove: ma-shi-na (3 hlonka)."),
        ("Rech' s dvizheniyami", "3-7 let", "Stihi s dvizheniyami: 'Mishka kosolapyy...' (idti vrazvalku)."),
    ]
    
    for title, age, description in games:
        if y < 4*cm:
            pdf.showPage()
            y = height - 3*cm
        
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(2*cm, y, title)
        pdf.setFont("Helvetica-Oblique", 9)
        pdf.drawString(12*cm, y, f"[{age}]")
        y -= 0.6*cm
        
        pdf.setFont("Helvetica", 10)
        pdf.drawString(2.5*cm, y, description)
        y -= 1*cm

def generate_tongue_twisters_pdf(pdf: canvas.Canvas, width: float, height: float):
    '''Generate tongue twisters PDF content'''
    y = height - 3*cm
    
    draw_text_latin(pdf, 2*cm, y, "CHISTOGOVORKI I SKOROGOVORKI", "Helvetica-Bold", 18)
    y -= 1*cm
    
    draw_text_latin(pdf, 2*cm, y, "Podborka dlya avtomatizatsii vsekh zvukov", "Helvetica", 12)
    y -= 1.5*cm
    
    twisters = [
        ("Zvuk [S]", [
            "Sa-sa-sa - v lesu begalа lisa",
            "So-so-so - u Soni kolesо",
            "Su-su-su - bylo holodno v lesu",
        ]),
        ("Zvuk [Z]", [
            "Za-za-za - u Koli oza",
            "Zo-zo-zo - u Zoi gnezdo",
            "Zu-zu-zu - moyu kozu",
        ]),
        ("Zvuk [Sh]", [
            "Sha-sha-sha - mama myla malysha",
            "Shu-shu-shu - ya pis'mo pishu",
            "Shi-shi-shi - shi'te, myshi, tikho",
        ]),
        ("Zvuk [L]", [
            "La-la-la - Mila pol myla",
            "Lo-lo-lo - na ulitse teplo",
            "Lu-lu-lu - stol stoit v uglu",
        ]),
        ("Zvuk [R]", [
            "Ra-ra-ra - nachilasya igra",
            "Ro-ro-ro - u nas novoe vedro",
            "Ry-ry-ry - u mal'chikov shary",
        ]),
    ]
    
    for sound, phrases in twisters:
        if y < 5*cm:
            pdf.showPage()
            y = height - 3*cm
        
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(2*cm, y, sound)
        y -= 0.8*cm
        
        pdf.setFont("Helvetica", 10)
        for phrase in phrases:
            pdf.drawString(2.5*cm, y, phrase)
            y -= 0.6*cm
        y -= 0.5*cm

def generate_workbooks_pdf(pdf: canvas.Canvas, width: float, height: float):
    '''Generate workbooks PDF content'''
    y = height - 3*cm
    
    draw_text_latin(pdf, 2*cm, y, "RABOCHIE TETRADI", "Helvetica-Bold", 20)
    y -= 1*cm
    
    draw_text_latin(pdf, 2*cm, y, "Zadaniya dlya razvitiya fonematicheskogo slukha", "Helvetica", 12)
    y -= 1.5*cm
    
    tasks = [
        ("Zadanie 1: Najdi pervyy zvuk", "Nazvat' pervyy zvuk v slovah: Aist, Oblako, Ukrop, Igla, Echo"),
        ("Zadanie 2: Sklonit' slogi", "Ma-sha, ko-tik, do-mik, lu-na - razdeli slova na slogi"),
        ("Zadanie 3: Gde zvuk?", "Opredelit' gde zvuk [R]: v nachale, seredine ili kontse slova"),
        ("Zadanie 4: Podobrat' rifmu", "Dom - ... (kom, tom, gnorm), kot - ... (rot, krot, mot)"),
        ("Zadanie 5: Dolgyy ili korotkyy?", "Opredelit' dolgie i korotkie slova: Kit - korotkoe, Cherepaha - dlinnoe"),
    ]
    
    for title, description in tasks:
        if y < 4*cm:
            pdf.showPage()
            y = height - 3*cm
        
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(2*cm, y, title)
        y -= 0.7*cm
        
        pdf.setFont("Helvetica", 10)
        pdf.drawString(2.5*cm, y, description)
        y -= 1.2*cm

def generate_breathing_pdf(pdf: canvas.Canvas, width: float, height: float):
    '''Generate breathing exercises PDF content'''
    y = height - 3*cm
    
    draw_text_latin(pdf, 2*cm, y, "DYKHATEL'NAYA GIMNASTIKA", "Helvetica-Bold", 20)
    y -= 1*cm
    
    draw_text_latin(pdf, 2*cm, y, "Uprazhneniya dlya razvitiya rechevogo dykhaniya", "Helvetica", 12)
    y -= 1.5*cm
    
    exercises = [
        ("Poduv na oduvanchik", "Glubokiy vdokh nosom, medlennyy vydokh rtom na oduvanchik (5 raz)"),
        ("Naduvaenya shar", "Nadzhat' voobrazhaemyy shar: ff-fff-ffff (povtorit' 4-5 raz)"),
        ("Vetеrok", "Dunut' na bumashku pered litsom, chtoby ona poshevelalas'"),
        ("Puzyri", "Dunut' v trubochku v stakan s vodoy, delaya puzyri (3-4 raza)"),
        ("Svechtka", "Zaduvat' voobrazhaemye svechki: 1 sil'no, 3 - po ocheredit"),
    ]
    
    for title, description in exercises:
        if y < 4*cm:
            pdf.showPage()
            y = height - 3*cm
        
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(2*cm, y, title)
        y -= 0.6*cm
        
        pdf.setFont("Helvetica", 10)
        pdf.drawString(2.5*cm, y, description)
        y -= 1*cm

def generate_pdf(material_id: str, material: Dict[str, Any]) -> bytes:
    '''Generate PDF content for the material'''
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    
    # Generate content based on material type
    if material_id == 'articulation':
        generate_articulation_pdf(pdf, width, height)
    elif material_id == 'games':
        generate_games_pdf(pdf, width, height)
    elif material_id == 'tongue-twisters':
        generate_tongue_twisters_pdf(pdf, width, height)
    elif material_id == 'workbooks':
        generate_workbooks_pdf(pdf, width, height)
    elif material_id == 'breathing':
        generate_breathing_pdf(pdf, width, height)
    
    # Footer on all pages
    pdf.setFont("Helvetica-Oblique", 8)
    pdf.drawString(2*cm, 1.5*cm, "Logopediya v DOU | https://poehali.dev")
    
    pdf.save()
    buffer.seek(0)
    return buffer.read()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generate and download educational materials as PDF files
    Args: event with httpMethod and queryStringParameters (material_id)
    Returns: HTTP response with PDF file or error
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
    
    # Generate PDF file
    pdf_content = generate_pdf(material_id, material)
    pdf_base64 = base64.b64encode(pdf_content).decode('utf-8')
    
    # Return PDF file as base64
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/pdf',
            'Content-Disposition': f'attachment; filename="{material["filename"]}"',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Disposition'
        },
        'isBase64Encoded': True,
        'body': pdf_base64
    }