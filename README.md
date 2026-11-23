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
- Для владельца: чтобы добавить кейсы, внесите новые slug в `selected-cases.psv` и детали в `case-details.psv` либо добавьте инженерный кейс в `engineering-cases.psv`. Запустите `npm run portfolio:export` из этой папки, если рядом находится исходный архив, затем проверьте изменения и сборку. Экспорт только дописывает новые двуязычные записи; уже опубликованные тексты, карточки, порядок, медиа и настройки сайта не меняются. Для редактирования существующего кейса правьте обе языковые версии YAML напрямую. Архив не требуется для сборки.
- После добавления проверьте, не опубликована ли эта работа под другим названием: `node src/scripts/audit-case-overlap.mjs --against=case-slug`. Совпадение слов — повод сверить исходный заказ, а не автоматическое решение об объединении. При объединении сохраняйте публичный переход со старого адреса через `src/scripts/case-aliases.mjs`.
- Репозиторий содержит только витрину; приватные материалы заказов не копируются.

### Уведомления поисковиков

- [Карта сайта](https://wporgru.github.io/web-portfolio/sitemap-index.xml) содержит канонические адреса обеих языковых версий.
- [Текстовая карта сайта](https://wporgru.github.io/web-portfolio/sitemap.txt) содержит тот же набор URL в формате «один адрес на строку». Сборка проверяет совпадение с XML; даты и изображения остаются в XML.
- [Диагностическая XML-карта](https://wporgru.github.io/web-portfolio/sitemap-discovery.xml) — отдельный файл с 28 каноническими страницами, без вложенных карт и расширений изображений. В Search Console его можно проверять независимо от полной карты: различайте отправку, успешное чтение и фактическую индексацию. Этот файл не заменяет полный sitemap и не задаёт приоритет ранжирования.
- При выпуске CI проверяет публичные карты и выборку страниц. Для полной сверки опубликованного релиза запустите `node src/scripts/check-live-discovery.mjs --all`: проверяет каждый адрес из карты по HTTP, canonical, robots и взаимным ссылкам RU/EN. Это проверка сайта, а не отчёт об индексации.
- Для кейсов `lastmod` берётся из Git-истории соответствующего текста и его иллюстраций, а не из времени сборки. Для остальных страниц дата не подставляется.
- Для обновлённых страниц: `node src/scripts/notify-indexnow.mjs showcase/78-dosok/ showcase/78-dosok/en/`.
  Команда проверяет файл подтверждения, карту сайта и канонические страницы на GitHub Pages. Добавьте `--send`, чтобы отправить один пакет через общий шлюз IndexNow (Яндекс, Bing и другие участники). Отправляйте только изменённые страницы, не весь сайт.
- HTTP 200 — пакет передан; HTTP 202 — проверка ключа ещё не закончилась. Ни один из этих статусов не показывает появление страницы в поиске.
- В Search Console используйте ресурс с префиксом URL `https://wporgru.github.io/web-portfolio/`, а не весь хост. После подтверждения ресурса добавьте `sitemap-index.xml` и используйте отчёт «Эффективность» для измерения показов, запросов и позиций.
