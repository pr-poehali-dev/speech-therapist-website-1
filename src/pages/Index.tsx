import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const BACKEND_URL = 'https://functions.poehali.dev/4a75476f-857b-4505-813c-ced5409e0204';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);

  const handleDownload = async (materialId: string, materialName: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}?id=${materialId}`);
      
      if (response.ok) {
        // Get PDF as blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${materialId}.pdf`;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Ошибка при скачивании материала');
      }
    } catch (error) {
      alert('Произошла ошибка. Попробуйте позже.');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const methods = [
    {
      title: 'Артикуляционная гимнастика',
      description: 'Упражнения для укрепления мышц речевого аппарата',
      icon: 'Smile',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Дыхательные упражнения',
      description: 'Развитие правильного речевого дыхания',
      icon: 'Wind',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      title: 'Звукопроизношение',
      description: 'Постановка и автоматизация звуков',
      icon: 'Music',
      color: 'bg-accent/10 text-accent'
    },
    {
      title: 'Развитие фонематического слуха',
      description: 'Умение различать звуки речи',
      icon: 'Ear',
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Мелкая моторика',
      description: 'Пальчиковые игры и упражнения',
      icon: 'Hand',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      title: 'Логоритмика',
      description: 'Речь + движение + музыка',
      icon: 'Music2',
      color: 'bg-accent/10 text-accent'
    }
  ];

  const schedule = [
    { day: 'Понедельник', time: '13:00 - 17:00', groups: 'Индивидуальные занятия' },
    { day: 'Вторник', time: '9:00 - 13:00', groups: 'Групповые и индивидуальные занятия' },
    { day: 'Среда', time: '9:00 - 13:00', groups: 'Групповые и индивидуальные занятия' },
    { day: 'Четверг', time: '9:00 - 13:00', groups: 'Групповые и индивидуальные занятия' },
    { day: 'Пятница', time: '13:00 - 17:00', groups: 'Индивидуальные занятия' }
  ];

  const parentsInfo = [
    {
      question: 'Когда нужно обратиться к логопеду?',
      answer: 'Если в 3 года ребенок не говорит фразами, в 4-5 лет искажает звуки, заменяет их или пропускает, есть трудности с пониманием речи.'
    },
    {
      question: 'Как подготовиться к занятию?',
      answer: 'Выспаться, поесть за 1-2 часа до занятия, взять с собой хорошее настроение! Важно, чтобы ребенок был спокоен и готов к занятию.'
    },
    {
      question: 'Как закреплять материал дома?',
      answer: 'Ежедневно выполняйте домашние задания по 10-15 минут. Делайте артикуляционную гимнастику перед зеркалом, повторяйте новые звуки в играх.'
    },
    {
      question: 'Как долго длится коррекция?',
      answer: 'Зависит от сложности нарушения. В среднем от 3 месяцев до 1-2 лет. Регулярность занятий и домашняя работа ускоряют процесс.'
    }
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🗣️</span>
              </div>
              <span className="font-bold text-xl text-foreground">Логопедия в ДОУ</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'О логопеде', 'Методики', 'Успехи', 'Материалы', 'Расписание', 'Родителям', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                Учитель-логопед
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Правильная речь - 
                <span className="text-primary"> залог успеха</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Помогаю детям обрести уверенность в общении через современные логопедические методики. 
                Индивидуальный подход к каждому ребенку.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => scrollToSection('методики')} className="gap-2">
                  <Icon name="BookOpen" size={20} />
                  Узнать больше
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('контакты')} className="gap-2">
                  <Icon name="Mail" size={20} />
                  Контакты
                </Button>
              </div>

            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/7c66309a-8703-4a04-abc9-28e4db339271.jpg"
                alt="Логопедия"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="о логопеде" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in order-2 md:order-1">
              <Badge className="mb-4">О логопеде</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Евсеева Елена Сергеевна</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Учитель-логопед высшей квалификационной категории
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="GraduationCap" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Образование</h4>
                    <p className="text-muted-foreground">Высшее педагогическое образование, специальность "Логопедия"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Award" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Опыт работы</h4>
                    <p className="text-muted-foreground">Более 7 лет работы с детьми дошкольного возраста</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Star" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Достижения</h4>
                    <p className="text-muted-foreground">200+ детей получили помощь, 98% родителей довольны результатами</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
                <img
                  src="https://cdn.poehali.dev/files/2e32b223-7a25-4182-acb0-1125683c4148.jpg"
                  alt="Учитель-логопед"
                  className="relative rounded-3xl shadow-2xl w-full h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="сертификаты" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Квалификация</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Сертификаты и дипломы
            </h2>
            <p className="text-lg text-muted-foreground">
              Постоянное повышение квалификации и профессиональный рост
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up group cursor-pointer">
              <div className="relative h-80 bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Award" size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Диплом о высшем образовании</h3>
                <p className="text-muted-foreground text-center text-sm">Специальность "Логопедия"</p>
                <Button variant="outline" className="mt-6 gap-2" size="sm">
                  <Icon name="Plus" size={16} />
                  Загрузить фото
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up group cursor-pointer" style={{ animationDelay: '100ms' }}>
              <div className="relative h-80 bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="FileCheck" size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Сертификат повышения квалификации</h3>
                <p className="text-muted-foreground text-center text-sm">Современные методики коррекции речи</p>
                <Button variant="outline" className="mt-6 gap-2" size="sm">
                  <Icon name="Plus" size={16} />
                  Загрузить фото
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up group cursor-pointer" style={{ animationDelay: '200ms' }}>
              <div className="relative h-80 bg-gradient-to-br from-primary/5 to-secondary/5 flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Medal" size={40} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Дополнительные сертификаты</h3>
                <p className="text-muted-foreground text-center text-sm">Участие в конференциях и семинарах</p>
                <Button variant="outline" className="mt-6 gap-2" size="sm">
                  <Icon name="Plus" size={16} />
                  Загрузить фото
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              Нажмите на карточку, чтобы загрузить изображение вашего сертификата или диплома
            </p>
          </div>
        </div>
      </section>

      <section id="методики" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Наши методики</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Комплексный подход к развитию речи
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Используем проверенные методики и современные игровые техники
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {methods.map((method, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up border-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-2xl ${method.color} flex items-center justify-center mb-4`}>
                    <Icon name={method.icon} size={28} />
                  </div>
                  <CardTitle className="text-xl">{method.title}</CardTitle>
                  <CardDescription className="text-base">{method.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
            <img
              src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/a0617b9d-31ce-4a54-9d76-2bdca846c7dc.jpg"
              alt="Методики работы"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">Игровой формат занятий</h3>
                <p className="text-lg text-white/90">Дети учатся легко и с удовольствием</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="успехи" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Фото и видео</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Галерея
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Наши занятия, мероприятия и будни в детском саду
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group" onClick={() => setSelectedImage({ url: 'https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/770c23a4-9cce-4911-9a8d-bb25c302aaf8.jpg', title: 'Кабинет логопеда' })}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/770c23a4-9cce-4911-9a8d-bb25c302aaf8.jpg"
                  alt="Кабинет логопеда"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Кабинет логопеда</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group" style={{ animationDelay: '100ms' }} onClick={() => setSelectedImage({ url: 'https://cdn.poehali.dev/files/ffc83f06-7eee-44dd-babb-85bbb06b4496.png', title: 'Индивидуальное занятие' })}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/files/ffc83f06-7eee-44dd-babb-85bbb06b4496.png"
                  alt="Индивидуальное занятие"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Индивидуальное занятие</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group" style={{ animationDelay: '200ms' }} onClick={() => setSelectedImage({ url: 'https://cdn.poehali.dev/files/ac917d4f-8fec-4a64-a984-20208037fed0.png', title: 'Групповые занятия' })}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/files/ac917d4f-8fec-4a64-a984-20208037fed0.png"
                  alt="Групповые занятия"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Групповые занятия</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group" style={{ animationDelay: '300ms' }} onClick={() => setSelectedImage({ url: 'https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/81c3e6c6-8c5c-4be6-a0c7-c6d9b20d10e4.jpg', title: 'Успехи наших детей' })}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/81c3e6c6-8c5c-4be6-a0c7-c6d9b20d10e4.jpg"
                  alt="Успехи детей"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Успехи наших детей</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group" style={{ animationDelay: '400ms' }} onClick={() => setSelectedImage({ url: 'https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/7c66309a-8703-4a04-abc9-28e4db339271.jpg', title: 'Дидактические материалы' })}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/7c66309a-8703-4a04-abc9-28e4db339271.jpg"
                  alt="Логопедические материалы"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">Дидактические материалы</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer group bg-gradient-to-br from-primary/10 to-secondary/10" style={{ animationDelay: '500ms' }}>
              <div className="relative h-72 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Video" size={40} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Видео занятий</h3>
                <p className="text-muted-foreground mb-4">Посмотрите, как проходят наши занятия</p>
                <Button variant="outline" className="gap-2">
                  <Icon name="Play" size={16} />
                  Смотреть видео
                </Button>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="gap-2">
              <Icon name="Images" size={20} />
              Посмотреть все фото
            </Button>
          </div>
        </div>
      </section>

      <section id="материалы" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Полезные материалы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Скачайте бесплатно
            </h2>
            <p className="text-lg text-muted-foreground">
              Методические пособия и упражнения для занятий дома
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Артикуляционная гимнастика</CardTitle>
                    <CardDescription className="mb-4">
                      Комплекс упражнений для развития речевого аппарата. 12 страниц с иллюстрациями.
                    </CardDescription>
                    <Button variant="outline" className="gap-2" onClick={() => handleDownload('articulation', 'Артикуляционная гимнастика')}>
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="BookOpen" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Логопедические игры</CardTitle>
                    <CardDescription className="mb-4">
                      30+ игр для развития речи детей 3-7 лет. Можно играть всей семьей.
                    </CardDescription>
                    <Button variant="outline" className="gap-2" onClick={() => handleDownload('games', 'Логопедические игры')}>
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Icon name="Music" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Чистоговорки и скороговорки</CardTitle>
                    <CardDescription className="mb-4">
                      Подборка для автоматизации всех звуков русского языка.
                    </CardDescription>
                    <Button variant="outline" className="gap-2" onClick={() => handleDownload('tongue-twisters', 'Чистоговорки и скороговорки')}>
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="Pencil" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Рабочие тетради</CardTitle>
                    <CardDescription className="mb-4">
                      Задания для развития фонематического слуха и мелкой моторики.
                    </CardDescription>
                    <Button variant="outline" className="gap-2" onClick={() => handleDownload('workbooks', 'Рабочие тетради')}>
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name="Wind" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Дыхательная гимнастика</CardTitle>
                    <CardDescription className="mb-4">
                      Упражнения для развития речевого дыхания с пошаговыми инструкциями.
                    </CardDescription>
                    <Button variant="outline" className="gap-2" onClick={() => handleDownload('breathing', 'Дыхательная гимнастика')}>
                      <Icon name="Download" size={16} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Icon name="Video" size={28} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">Видеоуроки для родителей</CardTitle>
                    <CardDescription className="mb-4">
                      Как правильно заниматься с ребенком дома. 10 коротких видео.
                    </CardDescription>
                    <Button variant="outline" className="gap-2">
                      <Icon name="ExternalLink" size={16} />
                      Смотреть онлайн
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-primary to-secondary text-white animate-fade-in">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Icon name="Bell" size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Получайте новые материалы первыми</h3>
                  <p className="text-white/90">
                    Регулярно добавляю новые пособия и упражнения. Следите за обновлениями!
                  </p>
                </div>
                <Button size="lg" variant="secondary" className="gap-2 flex-shrink-0">
                  <Icon name="Mail" size={20} />
                  Подписаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="расписание" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Расписание</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              График работы
            </h2>
            <p className="text-lg text-muted-foreground">
              Занятия проходят ежедневно по группам и индивидуально
            </p>
          </div>

          <Card className="shadow-lg animate-slide-up">
            <CardContent className="p-0">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/50 transition-colors ${
                    index !== schedule.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{item.day}</div>
                      <div className="text-muted-foreground">{item.groups}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Clock" size={18} />
                    <span className="font-medium">{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-primary/5 rounded-2xl border-2 border-primary/20 animate-fade-in">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={24} className="text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Важно знать</h4>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Icon name="User" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Индивидуальные занятия:</strong> 20 минут, 2 раза в неделю</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Icon name="Users" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>Групповые занятия:</strong> 30 минут, 3 раза в неделю</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="родителям" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="animate-fade-in">
              <Badge className="mb-4">Родителям</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ответы на частые вопросы
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Все, что нужно знать о логопедических занятиях
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://cdn.poehali.dev/projects/cb36eb85-ae57-4cae-b98f-fed5b756a9f6/files/fe4d664d-41ca-4cc1-9ecf-234d6bbc3948.jpg"
                  alt="Занятия с родителями"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="animate-slide-up">
              <Accordion type="single" collapsible className="space-y-4">
                {parentsInfo.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="bg-white rounded-lg px-6 border-2 hover:border-primary/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-primary to-secondary text-white shadow-2xl animate-fade-in">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-4">Домашние задания</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Регулярные домашние упражнения - ключ к быстрому прогрессу. 
                    Получайте индивидуальные материалы после каждого занятия.
                  </p>
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Icon name="Download" size={20} />
                    Скачать материалы
                  </Button>
                </div>
                <div className="w-full md:w-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                    {['Артикуляционная гимнастика', 'Речевые игры', 'Дыхательные упражнения'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <Icon name="Check" size={18} />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="контакты" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4">Контакты</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Свяжитесь со мной
            </h2>
            <p className="text-lg text-muted-foreground">
              Запишитесь на консультацию или задайте вопрос
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon name="Phone" size={24} />
                </div>
                <CardTitle>Телефон</CardTitle>
                <CardDescription className="text-base">+7 (950) 136-60-13</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon name="Mail" size={24} />
                </div>
                <CardTitle>Email</CardTitle>
                <CardDescription className="text-base">alij1981@mail.ru</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <Icon name="MapPin" size={24} />
                </div>
                <CardTitle>Адрес</CardTitle>
                <CardDescription className="text-base">Иркутская область, Чунский район, р.п.Лесогорск, ул. Мелиораторов, 27 МДОБУ "Детский сад № 16 р.п.Лесогорск"</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Icon name="Clock" size={24} />
                </div>
                <CardTitle>Часы работы</CardTitle>
                <CardDescription className="text-base">
                  Пн, Пт: 13:00 - 17:00
                  <br />
                  Вт, Ср, Чт: 9:00 - 13:00
                  <br />
                  Сб-Вс: Выходной
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <Icon name="X" size={24} className="text-white" />
          </button>
          
          <div className="max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-xl font-medium mt-6">{selectedImage.title}</p>
          </div>
        </div>
      )}

      <footer className="py-8 px-4 border-t bg-muted/20">
        <div className="container mx-auto text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-xl">🗣️</span>
            </div>
            <span className="font-semibold text-foreground">Логопедия в ДОУ</span>
          </div>
          <p className="text-sm">
            © 2024 Все права защищены. Помогаем детям говорить правильно и красиво.
          </p>
        </div>
      </footer>
    </div>
  );
}