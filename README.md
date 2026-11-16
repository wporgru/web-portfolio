# Олег Тишин — портфолио веб-разработчика

**[Открыть портфолио](https://wporgru.github.io/web-portfolio/)** · [English version](https://wporgru.github.io/web-portfolio/en/)

Разрабатываю сайты и интернет-магазины на WordPress, WooCommerce и Laravel, готовлю каталоги к импорту, настраиваю техническое SEO и автоматизирую работу с данными. В кейсах показываю исходную задачу, реализацию и то, что удалось проверить.

- [Кейсы веб-разработки и автоматизации](https://wporgru.github.io/web-portfolio/showcase/) · [Case studies](https://wporgru.github.io/web-portfolio/showcase/en/)
- [Услуги веб-разработки](https://wporgru.github.io/web-portfolio/services/) · [Web development services](https://wporgru.github.io/web-portfolio/services/en/)
- [Как перенести магазин WooCommerce и сохранить заказы](https://wporgru.github.io/web-portfolio/guides/woocommerce-migration/) · [WooCommerce migration guide](https://wporgru.github.io/web-portfolio/guides/woocommerce-migration/en/)
- [Скачать резюме](https://wporgru.github.io/web-portfolio/#resume) · [Download the CV](https://wporgru.github.io/web-portfolio/en/#resume)

## О репозитории

Двуязычная витрина на [CV Hub](https://github.com/KeeGooRoomiE/cv_hub) (Astro, MIT). Русский — основной язык, английский доступен из меню и на страницах кейсов.

- Локальная сборка: Node.js 24+, npm ci, npm run build, npm run preview.
- Содержимое витрины: src/content/showcase и public/media/projects.
- Для владельца: редактируйте selected-cases.psv и запустите npm run portfolio:export из этой папки, если рядом находится исходный архив. Сам архив не нужен для сборки сайта. Вручную отредактированные YAML будут перезаписаны экспортом.
- Репозиторий содержит только витрину; приватные материалы заказов не копируются.

### Уведомления поисковиков

- [Карта сайта](https://wporgru.github.io/web-portfolio/sitemap-index.xml) содержит канонические адреса обеих языковых версий.
- [Текстовая карта сайта](https://wporgru.github.io/web-portfolio/sitemap.txt) содержит тот же набор URL в формате «один адрес на строку». Сборка проверяет совпадение с XML; даты и изображения остаются в XML.
- Для кейсов `lastmod` берётся из Git-истории соответствующего текста и его иллюстраций, а не из времени сборки. Для остальных страниц дата не подставляется.
- Для обновлённых страниц: `node src/scripts/notify-indexnow.mjs showcase/78-dosok/ showcase/78-dosok/en/`.
  Команда проверяет файл подтверждения, карту сайта и канонические страницы на GitHub Pages. Добавьте `--send`, чтобы отправить один пакет через общий шлюз IndexNow (Яндекс, Bing и другие участники). Отправляйте только изменённые страницы, не весь сайт.
- HTTP 200 — пакет передан; HTTP 202 — проверка ключа ещё не закончилась. Ни один из этих статусов не показывает появление страницы в поиске.
- В Search Console используйте ресурс с префиксом URL `https://wporgru.github.io/web-portfolio/`, а не весь хост. После подтверждения ресурса добавьте `sitemap-index.xml` и используйте отчёт «Эффективность» для измерения показов, запросов и позиций.
