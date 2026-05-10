# 🐻 Bear · 3D Portfolio

Светлый игривый портфолио-сайт для 3D-художника на **Vite + React + react-three-fiber**.
На главной — интерактивный персонаж, которого можно крутить мышью.

## Запуск

```bash
npm install
npm run dev
```

Открой http://localhost:5173

Сборка:

```bash
npm run build
npm run preview
```

## Структура

```
public/
  models/          # сюда положить character.glb
  works/           # превью работ (jpg/png/webp)
src/
  components/
    Hero.jsx
    CharacterScene.jsx   # сцена R3F — placeholder-медведь из примитивов
    Gallery.jsx
    About.jsx
    Contacts.jsx
    Navbar.jsx
    Footer.jsx
  data/
    works.js       # массив работ
    contacts.js    # ссылки на соцсети
```

## Как заменить placeholder-модель на свою

1. В Blender: `File → Export → glTF 2.0 (.glb)`. Включи `Apply Modifiers` и `+Y Up`.
2. Положи файл в `public/models/character.glb`.
3. В `src/components/CharacterScene.jsx`:
   - раскомментируй `useGLTF` в импорте,
   - раскомментируй блок `CharacterGLB` и `useGLTF.preload`,
   - в `<Suspense>` замени `<BearPlaceholder />` на `<CharacterGLB scale={1.2} position={[0, -1, 0]} />`.

Подбери `scale` и `position` под свою модель.

## Как добавить работы

1. Положи превью в `public/works/имя.jpg` (рекомендую 1200×900).
2. Добавь объект в массив в `src/data/works.js`:

```js
{
  id: 'my-work',
  title: 'Название',
  tags: ['Character', 'Stylized'],
  image: '/works/имя.jpg',
  description: 'Короткое описание.',
  palette: ['#B57BFF', '#FFB4D9'], // фоллбек-градиент, если картинка не загрузится
}
```

## Контакты

Заполни свои ссылки в `src/data/contacts.js`.

## Стек

- Vite, React 18
- three.js + @react-three/fiber + @react-three/drei
- Tailwind CSS
- framer-motion, lucide-react
