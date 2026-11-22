export const serviceDetails = {
  'wordpress-contact-form-repair': {
    ru:[
      'Посетитель видит «Отправлено», а отдел продаж не получает заявку',
      'Не начинаю с установки SMTP или CAPTCHA. Сначала воспроизвожу заявку с контрольными данными и смотрю, где заканчивается её путь: в браузере, фильтре формы, почтовой системе или ящике менеджера. Если по форме одновременно идут спам и пропадают обычные заявки, проверяю оба сценария отдельно.',
      'Передам список исправленных форм, результаты контрольных отправок по согласованным страницам, получателям и устройствам, а также настройки, которые стоит проверить после следующего обновления. Для антиспама отдельно согласуем период наблюдения и признаки ложной блокировки.',
    ],
    en:[
      'Visitors see “Sent”, but the sales team gets no enquiry',
      'I do not start by installing SMTP or CAPTCHA. I reproduce the enquiry with test data and trace where it stops: browser, spam filter, mail system or recipient inbox. If the form both admits spam and loses genuine enquiries, those are separate test cases.',
      'Receive a list of fixed forms, results for the agreed pages, recipients and devices, and the settings to recheck after an update. For spam protection, agree on an observation window and how to identify legitimate messages that were blocked.',
    ],
    steps:{
      ru:[
        ['Воспроизвожу сбой на конкретной странице','Открываю форму без входа в админку. Сверяю обязательные поля, сообщение после отправки и время теста. Если одинаковая форма стоит в подвале, карточке и всплывающем окне, проверяю согласованные места отдельно.'],
        ['Нахожу, где пропадает заявка','Сопоставляю результат обработки формы с почтовым журналом, если он доступен. Проверяю получателя и контрольный ящик. Ложную блокировку фильтром не исправить сменой SMTP, а подтверждение отправки не равно письму во входящих.'],
        ['Исправляю причину, не меняя остальное','Правлю нужную форму, шаблон письма или фильтр. Антиспам проверяю на согласованных обезличенных примерах вместе с нормальной заявкой: важно не перекрыть обращения клиентов. Установку нового плагина отделяю от точечной правки.'],
        ['Проверяю, что получает менеджер','Согласуем тестовые значения, страницу, получателя и время. В письме проверим обязательные поля и обратный контакт. Если CRM или мессенджер не участвовали в тесте, не считаю их проверенными.'],
      ],
      en:[
        ['Reproduce the issue on the affected page','Open the form while logged out and record required fields, the submission response and the test time. If a form appears in the footer, on a listing and in a popup, verify the agreed placements separately.'],
        ['Find where the enquiry stops','Compare the form result with the mail log when available. Check the recipient and test inbox. Changing SMTP will not resolve a spam false positive, and a successful send is not proof of inbox delivery.'],
        ['Fix the affected layer','Adjust the specific form, mail template or filter. Test spam controls on agreed, redacted examples as well as a normal enquiry so genuine contacts are not blocked. Keep plugin replacement separate from a targeted fix.'],
        ['Check what the team actually receives','Agree on test values, page, recipient and time. Verify the required fields and reply contact in the delivered message. Any CRM or messenger that did not participate in the test is reported separately.'],
      ],
    },
    questions:{
      ru:[
        ['Нужно менять Contact Form 7 или MetForm?', 'Не обязательно. Если проблема в настройке, адресе получателя или подключении формы, сначала рассматриваю правку на месте. Замену обсуждаем, когда она надёжнее ремонта и понятно, какие поля и оформление нужно перенести.'],
        ['Можно убрать спам без неудобной проверки для всех?', 'Выберем защиту по примерам нежелательных заявок и проверим обычную отправку с телефона. Долгосрочный эффект определяется наблюдением и числом ложных срабатываний, а не одним тестом.'],
        ['Если письма всё равно нет после отправки?', 'Проверю, создала ли форма письмо, кому она его адресовала и что видно в почтовых журналах. Если письма уже приняты почтой, проверим правила ящика и папку спама у согласованного получателя.'],
      ],
      en:[
        ['Do we need to replace Contact Form 7 or MetForm?', 'Not necessarily. If the issue is a setting, recipient or page embed, start with a targeted repair. Replace the plugin only when that is the more reliable option and required fields and presentation are clear.'],
        ['Can we reduce spam without adding friction for every visitor?', 'Choose protection based on examples and check a normal submission on mobile. Judge longer-term impact through observation and false positives, not a single test.'],
        ['What if there is still no email after submission?', 'Check whether the form generated the message, where it addressed it and what the mail logs show. If the mail system accepted it, check mailbox rules and spam handling with the agreed recipient.'],
      ],
    },
  },
  'wordpress-php-plugin-updates': {
    ru:[
      'Хостинг просит обновить PHP, а тема и плагины давно не менялись',
      'Переход проверяю на конкретной связке версий, а не по одному номеру PHP. Если расширение дублирует доставку, кеш или форму, сначала выясню, какой модуль действительно нужен. Если шаблон зависит от снятого с поддержки кода, предложу выбор между исправлением, заменой компонента и отдельным редизайном.',
      'Передам список обновлений и исключений, результаты контрольных проверок и способ отката. Для магазина отдельно согласуем, что делать с заказами и остатками, которые изменились во время выпуска.',
    ],
    en:[
      'Your host wants newer PHP, but the theme and plugins are old',
      'Test the actual combination of versions instead of choosing PHP in isolation. If two extensions handle shipping, caching or a form, identify which one the site actually uses. If a template depends on unmaintained code, compare a compatibility fix, a component replacement and a separate redesign.',
      'Receive a record of updates and exclusions, acceptance checks and a rollback procedure. For a store, agree separately on how to handle orders and stock changes made during release.',
    ],
    questions:{
      ru:[
        ['Можно оставить текущую тему и оформление?', 'Часто да. Сначала проверю тему и её пользовательские правки. Если тема совместима, менять внешний вид ради обновления не нужно.'],
        ['Включать автообновление всех плагинов?', 'Не одной настройкой для всех. Разделю расширения по последствиям сбоя: одно правит текст, другое управляет оплатой или доставкой. Согласуем, что обновляется автоматически, а что проверяется на копии до выпуска.'],
        ['Можно просто вернуть старую резервную копию?', 'Для действующего магазина сперва проверим, что появилось после снимка базы: заказы, регистрации и остатки. Откат кода и восстановление всей базы — разные операции.'],
      ],
      en:[
        ['Can we keep the current theme and design?', 'Often yes. I check the theme and custom changes first. If they are compatible, there is no need to change the design just to upgrade.'],
        ['Should we auto-update every plugin?', 'Not with one blanket rule. A copy-editing plugin and a payment or shipping integration have different failure impacts. Agree which plugins can update automatically and which need staging checks.'],
        ['Can we just restore an old backup?', 'For a live store, check which orders, registrations and stock changes arrived after the snapshot. Rolling back code and restoring an entire database are different operations.'],
      ],
    },
  },
  'woocommerce-digital-downloads': {
    ru:[
      'Покупатель оплатил, но не получил файл',
      'Проверю по отдельности уведомление от платёжной системы, статус заказа, разрешение на скачивание и доставку письма. Письмо может не прийти даже при выданном доступе, а красивая страница «Спасибо» не заменяет подтверждение оплаты.',
      'На выходе — настроенный сценарий на контрольном товаре, правила доступа, инструкция по добавлению и замене файлов и список проверенных состояний. Если покупателю надо вернуть доступ после сбоя, покажу этот сценарий менеджеру.',
    ],
    en:[
      'The buyer paid but did not receive the file',
      'Check the gateway confirmation, order status, download permission and email delivery independently. An email can fail even when access was granted, and a working thank-you page is not payment confirmation.',
      'Get a verified flow for an agreed product, access rules, instructions for adding and replacing files and a list of tested states. I can show store staff how to reissue download access after a failure.',
    ],
    questions:{
      ru:[
        ['Можно продавать файл без регистрации?', 'Да. Сначала согласуем покупку как гость и отдельно проверим, как покупатель получит ссылку и сможет вернуться к скачиванию.'],
        ['Подойдёт обычная ссылка из медиатеки?', 'Не всегда. Публичный адрес может открываться без покупки. Способ выдачи выбираю с учётом размера файла, хостинга и требуемых ограничений; доступ без заказа проверяем отдельно.'],
        ['Можно проверить до запуска?', 'Да. Используем тестовый файл и согласованный способ оплаты. Проверяем успешную покупку, отказ или отмену и попытку получить файл без оплаченного заказа.'],
      ],
      en:[
        ['Can I sell files without a customer account?', 'Yes. Agree on guest checkout and test how guests receive their link and return to the download.'],
        ['Can I use a regular media library URL?', 'Not always. A public URL may work without purchase. File size, hosting and access requirements determine the delivery method. We test access without an order separately.'],
        ['Can we test before launch?', 'Yes. Use a test file and an agreed payment method. Check success, failure or cancellation, and an attempt to access a file without a paid order.'],
      ],
    },
  },
  'woocommerce-store-improvements': {
    ru: [
      'Магазин уже продаёт, но штатного поведения не хватает',
      'Например, покупатель видит размер в карточке, но не может найти его фильтром. Сначала беру пару контрольных товаров и проверяю данные, шаблон и импорт. Если причина в атрибутах, не нужно менять всю витрину. Если нужна новая логика, заранее согласуем правило и исключения: какой товар оно затронет, какие цены и купоны сохранятся.',
      'Вы получите согласованную доработку, перечень изменённых шаблонов или правил и короткую инструкцию для менеджера. Приёмка — по контрольным товарам и сценариям: что появилось на витрине, что осталось без изменений и что нужно повторно проверить после следующего импорта или обновления.',
    ],
    en: [
      'The store already sells, but its default behavior falls short',
      'A size may be visible on the product page yet missing from the filter. I pick representative products and check the data, template and import. If the issue is attribute assignment, redesigning the whole store is unnecessary. New behavior starts with a rule and its exceptions: which products it touches and what should happen to existing prices and coupons.',
      'Get the agreed changes, a list of affected templates or rules and short instructions for store staff. Acceptance uses specific products and workflows: what changed, what stayed intact and what to recheck after the next import or update.',
    ],
    questions: {
      ru: [
        ['Можно ли заказать только одну доработку?', 'Да. Приведите один пример и опишите ожидаемый результат. Если всё упирается в настройки или одну правку шаблона, нет смысла заказывать пересборку магазина.'],
        ['Что будет с товарами и заказами при публикации?', 'Доработку собираю отдельно от рабочей базы. На сайт переношу согласованные изменения, а не устаревшую копию с заказами. Окно работ и способ отката обсуждаем до выпуска.'],
        ['Обязательно ли писать плагин?', 'Нет. Проверю, можно ли решить задачу штатной настройкой или правкой шаблона. Отдельное расширение имеет смысл, когда правило должно жить независимо от темы или работать в нескольких местах.'],
        ['Как проверить скидку или промокод?', 'Заранее выпишем обычный и исключённый товар, порог количества или суммы и правила совмещения. Затем проверим цены с купоном и без него, включая возврат к обычной цене после удаления купона.'],
      ],
      en: [
        ['Can I commission just one improvement?', 'Yes. Send one example and the expected result. If a setting or one template change is enough, there is no reason to rebuild the store.'],
        ['What happens to products and orders during release?', 'The change is prepared outside the live database. I deploy the agreed modifications, not an old copy of the orders. We agree on the release window and rollback approach beforehand.'],
        ['Does every change need a plugin?', 'No. A core setting or a template adjustment may be enough. A separate extension makes sense when a rule must stay independent of the theme or apply in several places.'],
        ['How do we verify a discount or coupon?', 'Agree on eligible and excluded products, thresholds and stacking rules. Then compare prices with and without the coupon, including whether the regular price returns when it is removed.'],
      ],
    },
  },
  'website-contact-widgets': {"ru":["Есть контакты, но их неудобно искать на телефоне","Для страницы услуги лучше несколько понятных способов связи, чем ещё одна кнопка, закрывающая элементы сайта. Сначала проверим расположение и выберем только те каналы, на которые менеджер отвечает.","Вы получите установленный блок или готовый фрагмент с инструкцией; отдельно укажу проверенные страницы, размеры экрана и сценарии."],"en":["Contact details are hard to find on mobile","Give visitors a few clear choices rather than another button that covers the page. We first check placement and choose channels your team actually monitors.","Receive an installed widget or a ready-to-embed snippet with instructions and a list of tested pages, viewport sizes and behaviors."],"questions":{"ru":[["Нужно ли менять тему или CMS?","Обычно нет. Способ размещения зависит от сайта. На WordPress, Creatium или InSales можно согласовать установку, а для MODX и других систем — передать отдельный код с инструкцией вашему разработчику. Если меняете мессенджер, сверим не только плавающий виджет, но и согласованные ссылки в шапке, подвале и контактах."],["Чем проверка кнопки отличается от проверки обращения?","Открытие меню проверяет интерфейс. Чтобы подтвердить поступление заявки или сообщения, отдельно согласуем тест и получателя."]],"en":[["Do I need to change the theme or CMS?","Usually not. The embed method depends on the site. We can scope installation for WordPress, Creatium or InSales, or hand off the code and instructions for your MODX developer. If you are replacing a messenger, we review the agreed header, footer and contact page links as well as the floating widget."],["How is a button test different from an enquiry test?","Opening the menu verifies the interface. To confirm that a message actually arrives, agree on a separate test and its recipient."]]}},
  'corporate-email-signatures': {"ru":["Один дизайн, разные данные сотрудников","Проверим образец с длинным именем или должностью и согласуем кликабельные контакты. Для большого комплекта отдельно оговорим проверку исходных данных.","Передам шаблон или комплект файлов, инструкцию и перечень почтовых клиентов, на которых согласован образец."],"en":["One design, different employee details","Check a sample with a long name or title and agree on clickable contact fields. Define field validation separately for a larger team.","Receive a template or personalized files, setup instructions and a list of clients where the sample was tested."],"questions":{"ru":[["Можно ли начать без HTML-исходника?","Да, пришлите эскиз, логотип и список полей."],["Будет ли вид одинаковым во всех версиях Outlook?","Нет. Отображение зависит от версии и настроек изображений; согласуем целевые приложения."]],"en":[["Can we start without HTML source?","Yes. Send a sketch, logo and field list."],["Will it look identical in every Outlook version?","No. Rendering depends on the version and image settings. Agree on target applications first."]]}},
  'affiliate-link-audit': {
    ru: ['В отчёте — битая ссылка. На сайте — тот ли это адрес?', 'Одна и та же карточка может показывать устаревший адрес из сохранённых данных, из импорта или из шаблона. Отдельно проверяю, воспроизводится ли проблема на публичной странице и можно ли связать с ней событие из кабинета. Не переписываю каталог по одному сигналу из отчёта.', 'На выходе — перечень проверенных ссылок, страницы и источники данных, найденные причины и приоритеты. Если причина не доказана, укажу, какого поля или журнала не хватает. Для подтверждённых исправлений — план проверки и отката.'],
    en: ['The report shows a broken link. Does the site still publish that URL?', 'A product page might expose an expired link from stored data, an import or a template. I check whether the problem reproduces publicly and whether there is enough evidence to connect it to an event in the network report. A report row alone is not grounds for rewriting the catalog.', 'Get a list of checked links, pages and sources, confirmed causes and remediation priorities. If attribution is incomplete, the report names the missing field or log. Confirmed fixes come with verification and rollback steps.'],
    questions: {
      ru: [
        ['Нужно ли давать доступ к кабинету партнёрской сети?', 'Для первичной оценки достаточно обезличенной выгрузки: название программы, период, причина ошибки, счётчик и реферер, если он есть. Удалите ключи, токены и данные пользователей.'],
        ['Что делать, если партнёр больше не продаёт товар?', 'Сначала проверю точное совпадение модели и варианта. Если надёжной замены нет, можно приостановить исходящий переход и сохранить страницу, а не подставлять похожий товар.'],
      ],
      en: [
        ['Do you need access to the affiliate account?', 'An anonymized export is enough for an initial assessment: campaign name, period, error reason, click count and referrer if present. Remove keys, tokens and user data.'],
        ['What if the merchant no longer sells the product?', 'First verify an exact model and variant match. If there is no reliable replacement, pause the outbound action and retain the page rather than substituting a similar item.'],
      ],
    },
  },
  'woocommerce-store-development': {
    ru: ['Одинаково оформленные карточки могут требовать разных правил покупки', 'У магазина инструментов покупатель ищет товар по артикулу и характеристикам, у магазина мебели выбирает размер и отделку. Сначала проверим эти модели на небольшой выборке, затем решим, как организовать категории, фильтры и обновление товаров. Платежи и доставку включим только в согласованном объёме.', 'Вы получите витрину, редактируемые товары и оговорённые сценарии заказа. Зафиксируем, что проверено: поиск, товар с вариациями, способ доставки, уведомление или контрольная оплата — в зависимости от комплектации проекта.'],
    en: ['Similar product pages can require different buying rules', 'Tool buyers search by SKU and specifications, while furniture buyers choose size and finish. Test representative products first, then design categories, filters and update rules. Payment and shipping work follows the agreed scope.', 'Get the storefront, editable products and agreed order flows. The handoff records which scenarios were tested: search, variations, delivery, notification or a test payment, depending on the project scope.'],
    questions: {
      ru: [
        ['Можно начать без полной выгрузки?', 'Да, начнём с нескольких типичных товаров. Для массового запуска отдельно проверим поля, идентификаторы и фотографии.'],
        ['Можно сначала запустить каталог без онлайн-оплаты?', 'Да. Можно начать с заявки или запроса цены, а оплату подключить после согласования условий и выбора платёжного сервиса.'],
      ],
      en: [
        ['Can we start before the full export is ready?', 'Yes. Begin with a few representative products. Before full import, check fields, identifiers and images separately.'],
        ['Can we launch a catalog without online payments?', 'Yes. Start with enquiries or quote requests, and add online payments once terms and a payment provider are agreed.'],
      ],
    },
  },
  'wordpress-business-website': {
    ru: ['Посетитель ищет решение своей задачи, а не просто знакомится с компанией', 'Разная аудитория приходит за разным: гостю ресторана нужно меню или условия банкета, а клиенту ремонтной компании — виды работ, примеры и форма оценки. Поэтому сначала определю главные маршруты, затем соберу структуру вокруг них. Для «ПРОМАРКО», где тексты и фотографии оставались за клиентом, выделил отдельный этап: рабочий шаблон с согласованной палитрой без открытия демоданных для индексации.', 'Получите редактируемые страницы и шаблоны, настроенный способ обращения и список проверенных сценариев. Если отдельно заказываете наполнение, запуск или интеграции, зафиксируем их в смете и критериях приёмки.'],
    en: ['Visitors want to solve a problem, not just read a company profile', 'A restaurant guest wants a menu or banquet details. A renovation customer wants to see service types, examples and a quote form. Identify the key journeys first and build around them. For Promarko, where the client owned the copy and photography, I scoped the working template and approved color palette as a separate stage and kept demo content out of search.', 'Get editable pages and templates, a configured contact flow and a record of the tested scenarios. Content production, launch and integrations are listed separately in the estimate and acceptance criteria when included.'],
    questions: {
      ru: [
        ['Что делать, если тексты и фотографии ещё не готовы?', 'Начнём со структуры и одного ключевого шаблона. Согласуем, кто готовит материалы, какие блоки можно собрать сразу и при каких условиях открывать сайт для индексации.'],
        ['Можно ли обновлять содержание самостоятельно?', 'Да. Заранее выберем, что вы меняете сами: услуги, статьи, меню, баннеры или контактные данные. Покажу этот сценарий на готовой странице.'],
        ['Можно собрать сайт на WordPress, сохранив материалы с Wix?', 'Да, если у вас есть право использовать материалы. Отдельно посчитаем услуги, статьи, изображения и обязательные страницы. Согласуем, что переносить, что собрать заново и какие URL надо сохранить. В проекте SMD перенёс материалы о сервисе и блог, а магазин исключил из объёма.'],
        ['Что входит в проверку перед запуском?', 'Сверю согласованные страницы, навигацию, мобильные состояния и технические настройки поисковой доступности. Отправку тестовой заявки и проверку её доставки согласуем отдельно.'],
      ],
      en: [
        ['What if we do not have copy and photos yet?', 'Start with the page structure and one key template. Agree who provides materials, what can be built now and when the site is ready to open to search engines.'],
        ['Can we update content ourselves?', 'Yes. Decide what you will maintain: services, posts, menus, banners or contact details. I will demonstrate the workflow on a finished page.'],
        ['Can we move to WordPress and keep our Wix content?', 'Yes, if you have permission to reuse it. Inventory services, posts, images and essential pages separately. Agree on what to transfer, what to rebuild and which URLs must be retained. For SMD I moved service and blog material while leaving the shop out of scope.'],
        ['What do you check before launch?', 'Review the agreed pages, navigation, mobile states and technical search settings. A test submission and verification of its delivery are agreed separately.'],
      ],
    },
  },
  'wordpress-plugin-development': {
    ru: ['Нужно выключить покупку у одного поставщика, а не переписывать весь каталог', 'В проекте Sport-man отделил правило витрины от данных карточек: MU-плагин отключал переходы и покупку у 1 892 затронутых позиций. Проверил контрольный товар, чтобы убедиться, что покупка у других поставщиков осталась доступной. Если задачу можно решить такой изолированной правкой, нет смысла переделывать тему или массово менять товары.', 'Вы получите код, инструкцию установки, список затронутых условий и проверок. Будет понятно, как включить и отключить функцию, что происходит с уже записанными данными и какие сценарии повторять после обновлений.'],
    en: ['Pause purchases for one supplier without rewriting the whole catalog', 'For Sport-man, the storefront rule was separate from product records: a must-use plugin disabled clicks and purchases for 1,892 affected listings. A control product verified that unaffected offers still worked. An isolated rule can avoid a theme rebuild or a bulk product rewrite.', 'Get the implementation, installation notes and a record of conditions and checks. Know how to turn the feature on and off, what happens to existing data and what to retest after updates.'],
    questions: {
      ru: [
        ['Всегда ли нужен новый плагин?', 'Нет. Сначала проверю, можно ли получить нужное поведение штатной настройкой. Шаблон подходит для отображения, а правила бизнеса, которые должны жить независимо от темы, обычно удобнее держать отдельно.'],
        ['Будет ли доработка работать в блочном оформлении заказа?', 'Сначала определю тип оформления: классический, блочный или кастомный. Для блоков часть обычных PHP-хуков не подходит. Сценарий тестирую именно на том варианте, которым пользуются покупатели.'],
        ['Что останется после отключения?', 'До запуска разделю правила, которые меняют только поведение, и операции, которые записывают данные. Отключение функции не отменяет внесённые данные автоматически: если запись нужна, заранее согласуем резервную копию и способ восстановления.'],
      ],
      en: [
        ['Do I always need a new plugin?', 'No. First check whether built-in configuration is enough. Templates are useful for presentation; business rules that must survive a theme switch are usually better kept separate.'],
        ['Will this work with block checkout?', 'Identify the live checkout first: classic, block-based or custom. Some traditional PHP hooks are not suitable for blocks. Test the implementation with the checkout your customers actually use.'],
        ['What stays after disabling it?', 'Separate behavior-only rules from operations that write data. Disabling a feature does not unwind stored changes, so if writes are needed, agree on backup and recovery before deployment.'],
      ],
    },
  },
  'website-ux-audit': {
    ru: ['Кнопка есть на странице, но клиент не может завершить действие', 'Вердикта по одному скриншоту недостаточно: одинаково выглядящие кнопки могут вести к разным формам, а на телефоне меню и модальное окно меняют поведение. Проверка начинается с реальных действий и заканчивается точным условием, по которому можно принять исправление.', 'Карта проверенных сценариев, список проблем с приоритетами и доказательствами, а также критерии повторной проверки после правок. Сайт при аудите не меняю.'],
    en: ['The button is visible, but the customer cannot finish the task', 'A screenshot alone is not enough: identical buttons can open different forms, and menus and dialogs may behave differently on phones. Start with real actions and finish with acceptance criteria for the repair.', 'Get a record of checked flows, prioritized findings with evidence and a retest checklist. No site changes are made during the audit.'],
  },
  'affiliate-catalog-development': {
    ru: ['Подключённая партнёрская программа ещё не означает, что витрину есть чем наполнить', 'Начну с реальной выборки: два продавца могут по-разному назвать одну модель, а крупный фид — не содержать описаний или относиться к другому региону. Проверю это до разработки, чтобы не строить витрину на данных, которые не подходят.', 'Получите оценку фидов, правила сопоставления и рабочий путь от импорта до перехода к продавцу. В отчёте разделю клики, заказы и подтверждённые комиссии: это разные источники данных.'],
    en: ['An approved affiliate program does not necessarily supply a usable catalog', 'Start with a real sample: merchants may name the same model differently, while a large feed may have no descriptions or cover the wrong region. Verify that before building around the data.', 'Get a feed assessment, matching rules and a working path from import to merchant click-through. Reporting distinguishes clicks, orders and confirmed commissions because they come from different sources.'],
  },
  'b2b-catalog-and-enquiries': {
    ru: ['Цена зависит от задачи, но покупателю всё равно нужно выбрать модель', 'Карточка должна помогать сравнить технику, а заявка — передавать контекст. Если человек уже выбрал машину, не нужно заставлять его повторно вводить название: подставим модель, а при выборе нескольких позиций передадим весь список. Условия и итоговую цену согласует менеджер.', 'Получите редактируемые карточки, согласованные фильтры и рабочий сценарий обращения. Перед приёмкой проверим, что модель и количество не теряются между витриной, формой и уведомлением. Если в объём входит счёт, отдельно проверим его поля и статус заказа.',],
    en: ['The price depends on the job, but buyers still need to choose a model', 'The product page should support comparison, and the enquiry should carry the context. Prefill the chosen model instead of making buyers type it again; send the complete list when they select several items. Sales staff can then agree on terms and final pricing.', 'Get editable product pages, agreed filters and an enquiry flow. Before sign-off, verify that model and quantity survive the path from catalog to form to notification. If invoicing is in scope, check invoice fields and order status separately.'],
    questions: {
      ru: [
        ['Можно оставить каталог без онлайн-оплаты?', 'Да. Для отдельных товаров подойдёт запрос с карточки, для комплектов и нескольких позиций — корзина-заявка. Подтверждение условий и оплату можно вынести на следующий шаг.'],
        ['Что делать, если закупочные цены только в Excel?', 'Начнём с выборки: определим ключ товара, отделим закупочную цену от публичной и согласуем, какие поля обновляет импорт. Неопределённые строки не должны менять опубликованные карточки.'],
        ['Как понять, не теряются ли заявки?', 'Проверим открытие формы и содержимое уведомления, а по согласованию отправим контрольную заявку. Успешное открытие формы само по себе не доказывает доставку письма.'],
      ],
      en: [
        ['Can we keep the catalog without online payments?', 'Yes. Use a product-page enquiry for individual items or an enquiry cart for bundles and multiple items. Agreement and payment can happen afterward.'],
        ['What if supplier prices only exist in Excel?', 'Start with a sample. Define a product key, separate internal costs from public prices, and agree which fields imports may overwrite. Ambiguous rows should not update public listings.'],
        ['How do we know enquiries are not being lost?', 'Check the dialog and notification payload, then send an agreed test enquiry. A dialog opening successfully does not prove email delivery.'],
      ],
    },
  },
  'ai-agent-workflows': {
    ru: ['Один и тот же промпт каждый раз даёт разный результат', 'Превращу промпт в последовательность действий с обязательными входными данными, примерами и правилами остановки. Например, сценарий подготовки кейса использует только подтверждённые работы и помечает отсутствующие метрики, а текст перед публикацией проверяет редактор.', 'Получите настроенный сценарий, инструкцию запуска, примеры входа и результата, критерии приёмки и список действий, которые остаются за человеком.'],
    en: ['The same prompt gives a different result every time', 'Turn the prompt into a workflow with required inputs, examples and clear stop rules. A case-study workflow, for instance, cites verified work, flags missing metrics and leaves the publish decision to an editor.', 'Get a configured workflow, run instructions, sample inputs and outputs, acceptance criteria and a list of actions that stay under human control.'],
  },
  'website-vps-maintenance': {
    ru: ['Места на сервере не хватает даже на новую копию', 'Начну с замера и освобождения места за счёт воспроизводимых файлов. В медиатеку и базу пойду только после проверки зависимостей и выбора точки отката. Хранение копии вне VPS и пробное восстановление можно выделить в отдельные этапы.', 'Перечень изменений, замеры до и после, расписание и правила хранения копий. Отдельно отмечу, что проверено: создание архива, читаемость дампа или фактическое восстановление на стенде.'],
    en: ['The server is too full to create a new backup', 'Measure first and reclaim space from reproducible files. Only touch the media library or database after checking dependencies and choosing a rollback point. Off-server storage and a restore drill can be scoped separately.', 'A change log, before-and-after storage measurements, and the backup schedule and retention rules. Know exactly what was verified: archive creation, dump readability or an actual staging restore.'],
  },
  'laravel-catalog-development': {
    ru: ['Несколько поставщиков по-разному называют один товар', 'В пилоте сначала сравним, какие признаки действительно различают модели: артикул, объём, исполнение или комплектность. Записи, для которых данных не хватает, не будем объединять автоматически только из-за похожих названий.', 'Рабочая выборка от загрузки фида до страницы сравнения, правила сопоставления и сценарии для повторного прогона. Будет ясно, какие записи можно публиковать автоматически, а какие требуют проверки.'],
    en: ['Different suppliers use different names for the same product', 'In the pilot, identify which signals actually distinguish models: part number, capacity, configuration or bundle contents. Do not merge incomplete records automatically based on title similarity alone.', 'A working sample from feed ingestion to the comparison page, matching rules and repeatable verification cases. See which listings can go live automatically and which require review.'],
  },
  'wordpress-repair': {
    ru: ['После обновления сайт открывается, но часть функций пропала', 'Работающая главная не означает, что всё в порядке: редактор может перестать сохранять правки, а кэш — показывать старые страницы. Проверю, где именно расходится поведение, и предложу точечный ремонт или восстановление из копии. Если ограничение выставил хостинг, отделю работу на сайте от действий, которые может выполнить только провайдер.', 'Вы получите список изменений, результаты повторной проверки по проблемным сценариям и описание оставшихся ограничений. Если для исправления нужен откат, до запуска согласуем, какие данные могут измениться и как сохранить свежие записи.'],
    en: ['The site loads after an update, but some features are gone', 'A working homepage does not mean everything is healthy: the editor may no longer save changes, or the cache may still serve old pages. I isolate where behavior diverges and recommend a targeted fix or recovery from backup. If the host imposed a restriction, I separate the site work from actions only the provider can take.', 'Get a change list, the results of retesting the affected flows, and a record of anything still unresolved. If rollback is necessary, we agree upfront which data may change and how recent records will be preserved.'],
    questions: {
      ru: [
        ['Можно восстановить сайт без полного отката?', 'Иногда достаточно исправить один конфликт, вернуть настройки компонента или восстановить отдельные данные. Полный откат рассматриваю, когда точечное восстановление ненадёжно или занимает больше времени.'],
        ['Что делать, если не открывается wp-admin?', 'Для диагностики может понадобиться доступ к панели хостинга, файлам или базе. По тексту ошибки и журналам определю, какой доступ нужен и можно ли сначала проверить копию сайта.'],
        ['Потеряются ли заказы WooCommerce при восстановлении?', 'При откате всей базы новые заказы действительно могут пропасть. До отката сверю дату копии с заказами и согласую способ их сохранения. Если можно восстановить только проблемную часть, сначала оценю этот вариант.'],
        ['Каталог WooCommerce открывается, а отдельные товары зависают. Что прислать?', 'Дайте ссылки на одну рабочую и одну проблемную карточку из той же категории. Сравню тип товара, шаблон и ответ сервера. Затем повторю переход без входа в админку: открывающаяся категория сама по себе не подтверждает работу карточек.'],
      ],
      en: [
        ['Can you recover the site without a full rollback?', 'A single conflict fix, settings repair or partial data restore may be enough. I consider a full rollback when targeted recovery is unreliable or would take longer.'],
        ['What if wp-admin does not open?', 'Diagnosis may require hosting panel, filesystem or database access. The error and logs help determine which access is needed and whether testing on a copy is possible first.'],
        ['Will recovery remove recent WooCommerce orders?', 'A full database rollback can remove recent orders. Before rolling back, I compare the backup timestamp with order history and agree on how to preserve newer orders. If only the affected data can be restored, I assess that option first.'],
        ['The WooCommerce catalog loads, but some products hang. What should I send?', 'Send one working product and one failing product from the same category. I will compare product types, templates and server responses, then retry while signed out. A working category does not prove its product pages work.'],
      ],
    },
  },
  'website-redesign': {
    ru: ['Оформление устарело, но каталог и заказы уже работают', 'Договоримся, что сохраняем: адреса страниц, категории, привычный способ заказа и интеграции. Отдельно выделим, где можно менять структуру, а где достаточно переделать шаблон.', 'План обновления, согласованные экраны и список сценариев для приёмки. Сравним старую и новую витрины на одних и тех же страницах, а не только на главной.'],
    en: ['The design looks dated, but the store already takes orders', 'Agree on what stays: page URLs, categories, ordering flows and integrations. Decide where a structural change is worthwhile and where a template update is enough.', 'A redesign plan, agreed screens and an acceptance checklist. Compare the old and new storefront on the same pages, not just the homepage.'],
    questions: {"ru":[["Можно сначала согласовать новый дизайн, не переключая магазин?","Да. На копии можно проверить новую тему на существующем каталоге. Так был согласован первый этап «Сово Сова»; запуск на основном домене — отдельный этап."],["Смена темы сохраняет SEO автоматически?","Нет. Отдельно сравниваем URL, метаданные, индексируемость и редиректы до переключения и после. Сохранение одного SEO-плагина не доказывает сохранение всех настроек или позиций."]],"en":[["Can I approve the redesign before switching the live store?","Yes. On staging we can review the new theme with existing products. That was the first Sovo Sova phase; production cutover is a separate step."],["Does changing the theme preserve SEO automatically?","No. Compare URLs, metadata, indexability and redirects before and after cutover. Keeping the SEO plugin does not prove that settings or rankings are unchanged."]]},
  },
  'catalog-automation': {
    ru: ['После обновления дублируются товары или сбиваются цены', 'Новый прайс не должен перезаписывать вручную отредактированные карточки. Сначала определим, по какому идентификатору обновлять товары и что делать с позициями, исчезнувшими из файла.', 'Таблица сопоставления полей, тестовая выборка и правила повторной загрузки. При приёмке проверим примеры новых, изменённых и отсутствующих позиций.'],
    en: ['Updates create duplicate products or incorrect prices', 'A new price list should not overwrite manually edited listings. Agree on the update key and what happens when a product disappears from the source.', 'Field mapping, a sample run and rules for repeat imports. Review new, changed and missing items during acceptance.'],
    questions:{
      ru:[
        ['Можно продолжить импорт, если часть товаров уже загрузилась?', 'Да, если сначала установить, какие записи изменились и по какому ключу их сопоставляет импортёр. Проверю повторный запуск на выборке. Если ошибка в файле или ключе, простая перезагрузка всего прайса может создать дубли.'],
        ['Надо ли сразу менять тариф хостинга при ошибке 504?', 'Нет. Сначала сравним журнал, время сбоя и последний товар. Если процесс упирается в ограничение сервера, проверим меньший пакет или раздельную загрузку изображений; повышение тарифа имеет смысл, когда узкое место подтверждено.'],
      ],
      en:[
        ['Can an import resume after some products already loaded?', 'Yes, once we identify what changed and which key matches existing products. I test a retry on a sample first. Rerunning the whole file can create duplicates if the source or match key is wrong.'],
        ['Does a 504 mean we need to upgrade hosting?', 'Not by itself. First compare the error log, failure time and last product. If a server limit is confirmed, test smaller batches or a separate image import before changing the hosting plan.'],
      ],
    },
  },
  'technical-seo': {
    ru: ['Товары не появляются в поиске или вместо них показывается другой URL', 'Карта сайта может быть доступна, даже если карточки скрыты настройкой видимости, а canonical ведёт на другую версию. Сначала проверю группу важных страниц и сравню её с группой, которая работает. Так становится видно, где нужна правка общего шаблона, а где проблема только в одной записи.', 'Передам список приоритетов с примерами URL, причиной, затронутыми шаблонами и способом повторной проверки. Можно заказать только аудит или отдельно согласовать внедрение и повторную сверку. В отчёте отмечу охват: все проверенные URL или контрольная выборка.'],
    en: ['Product pages are missing from search or another URL appears instead', 'A sitemap can be available even when listings are hidden by a visibility setting or canonical points to another version. Compare an important group of affected pages with a working group. This shows where one template fix is needed versus an isolated record.', 'Get a prioritized list with example URLs, causes, affected templates and retest criteria. Choose the audit alone or scope implementation and verification separately. The report states whether each finding covers all checked URLs or a sample.'],
    steps:{
      ru:[
        ['Определяем приоритетные страницы','Согласуем, что приводит клиентов: услуги, категории, карточки или региональные страницы. Фиксируем дату падения и последние изменения, чтобы не смешивать переезд, переработку шаблона и сбой аналитики.'],
        ['Сверяем сайт и отчёты поисковиков','Сопоставлю карту сайта, ответы сервера, HTML и внутренние ссылки. Если есть доступ к Search Console и Яндекс Вебмастеру, отдельно сравню обход, индексацию и показы. Разница между этими данными — часть диагноза.'],
        ['Выбираем правки по охвату и риску','Например, один ошибочный canonical в шаблоне может затрагивать целую категорию. Перед правкой определим контрольные адреса, ожидаемый результат и способ возврата. Не буду удалять или перенаправлять полезные страницы только потому, что в отчёте они помечены как дубли.'],
        ['Проверяем результат после публикации','Повторю исходную проверку на основном сайте без входа в админку. Отдельно зафиксирую, что исправлено в HTML, какие URL переданы на переобход и что поисковик действительно обнаружил или включил в индекс.'],
      ],
      en:[
        ['Identify priority pages','Agree which pages bring customers: services, categories, products or regional pages. Record when the drop began and what changed so a move, template release and analytics problem are not conflated.'],
        ['Compare the site with search reports','Compare the sitemap, server responses, HTML and internal links. With access to Search Console and Yandex Webmaster, check crawling, indexing and impressions separately. Differences are useful diagnostic evidence.'],
        ['Prioritize changes by reach and risk','One incorrect canonical in a template can affect a whole category. Agree on control URLs, the expected result and rollback before editing. Do not remove or redirect useful pages just because a report marks them as duplicates.'],
        ['Retest after deployment','Repeat the original check on the public site without signing in. Record HTML fixes, URLs submitted for recrawling and pages the search engine actually discovered or indexed as separate outcomes.'],
      ],
    },
    questions:{
      ru:[
        ['Можно начать без доступа к админке и поисковым панелям?', 'Да. Для первичной проверки хватит адреса сайта и примеров страниц. Проверю публичные ответы и разметку. Выбранный поисковиком canonical, причины исключения и показы требуют данных поисковых панелей; если доступа нет, отмечу это в отчёте.'],
        ['Можно заказать аудит, а исправления сделать самим?', 'Да. В отчёте будут примеры, затронутые шаблоны и проверяемый ожидаемый результат. После внедрения можно отдельно заказать контрольную сверку.'],
        ['Можете обещать топ после исправлений?', 'Нет. Техническая правка убирает подтверждённое препятствие, но её нельзя выдавать за рост позиций. Показы и клики проверяем отдельно, по выбранным группам запросов и страниц.'],
      ],
      en:[
        ['Can we start without admin or webmaster access?', 'Yes. Send the site and sample pages for a first public HTTP and markup check. Search-engine-selected canonicals, exclusions and impressions need webmaster data. The report notes any missing access.'],
        ['Can our team implement the audit recommendations?', 'Yes. The report includes examples, affected templates and acceptance criteria. A follow-up verification can be scoped separately.'],
        ['Can you guarantee top rankings after repairs?', 'No. Technical fixes remove confirmed barriers, not guarantee rankings. Impressions and clicks are measured separately for the relevant queries and pages.'],
      ],
    },
  },
  'data-and-ai': {
    ru: ["Когда нужен файл, а когда — автоматизация","Для миграции или локализации обычно достаточно выгрузки с согласованными полями и списком пропусков. Если цены, остатки или отчёт меняются регулярно, нужен отдельный сценарий запуска с проверкой повторных прогонов.","Разовая задача: файл, описание столбцов и ограничения. Регулярная задача: рабочий пилот, примеры входа и выхода, инструкция запуска и список случаев, требующих ручной проверки."],
    en: ["When to export once and when to automate","A migration or localization project may only need a file with agreed fields and known gaps. If prices, stock or reports change regularly, define a repeatable run and verify what happens on refresh.","One-off work: a file, field descriptions and known limits. Recurring work: a working pilot, input and output examples, run instructions and cases that require manual review."],
    questions: {"ru":[["Можно заказать только файл, без разработки парсера?","Да. Уточним источник, нужные строки и колонки. Например, для Gauss результатом была таблица с артикулами и ссылками на фотографии, а не программа."],["Что произойдёт, если в источнике нет части данных?","Отмечу пропуски отдельно и согласую, какие данные оставить пустыми, дополнить из проверенного источника или передать на ручную проверку."],["Обязательно ли подключать ИИ?","Нет. Если задачу решают импорт, SQL или обычные правила, отдельный ИИ-сценарий не нужен."]],"en":[["Can I order just the file without a scraper?","Yes. We agree on the source, required records and columns. For example, the Gauss deliverable was a spreadsheet with SKUs and image URLs, not a program."],["What happens if some source fields are missing?","I flag missing values and agree which ones to leave blank, fill from a verified source or send for manual review."],["Is AI required?","No. If an import, SQL or deterministic rules solve the problem, there is no need for an AI workflow."]]},
  },
  'hosting-migration': {
    ru: ['Нужно сменить хостинг, не потеряв работающие функции', 'Переезд — не только копирование файлов. Отдельно проверю базу, сертификат, настройки домена и почты. Для магазина согласуем окно переключения, чтобы понимать, что делать с заказами, пришедшими в этот период.', 'Порядок переключения, контрольные страницы и сценарии, план отката. После переезда будет ясно, что проверено на новом хостинге и какие настройки остаются у регистратора или почтового провайдера.'],
    en: ['The site needs a new host without losing working features', 'A move is more than copying files. Check the database, certificate, domain and email settings separately. Agree on a cutover window for stores and how to handle orders placed during it.', 'A cutover sequence, verification checklist and rollback plan. Know what was tested on the new host and which settings remain with the registrar or email provider.'],
    questions:{
      ru:[
        ['Хостинг уже скопировал файлы. Можно подключиться только после переноса?', 'Да. Уточним, что именно перенесено. Проверю адрес WordPress, вход в админку, страницы и медиа. Если вместе с хостингом менялся домен, отдельно отмечу старые ссылки и проверю, куда ведут важные адреса.'],
        ['Можно восстановить сайт только из архива?', 'Начну с проверки комплекта: файлы, база и сведения о прежней среде. Если чего-то не хватает, перечислю ограничения до выпуска. Возможность открыть главную не доказывает, что сохранены формы, оплаты и последние заказы.'],
      ],
      en:[
        ['The host already copied the files. Can you help after the move?', 'Yes. I will confirm what was copied and check the WordPress address, admin access, pages and media. If the domain changed too, I will flag old links and verify where key URLs lead.'],
        ['Can the site be restored from an archive alone?', 'Start by checking the files, database and information about the old environment. I will document missing pieces before release. A working homepage does not prove that forms, payments or recent orders survived.'],
      ],
    },
  },
  'checkout-payments': {
    ru: ['Покупатель оплатил, а магазин не видит заказ', 'Проверю, где расходится сценарий: в форме, на стороне платёжного сервиса, при обновлении статуса или при отправке письма. Ошибка на одном шаге не означает, что нужно менять весь чекаут.', 'Воспроизводимый контрольный сценарий и результат по каждому шагу. Отдельно отмечу, что проверено в тестовой среде, а что — в согласованном рабочем сценарии.'],
    en: ['The customer paid but the store did not register it', 'Isolate whether the problem is in the form, payment provider, order status update or email. A failure at one step does not mean the whole checkout needs replacing.', 'A repeatable test flow and a result for each step, with sandbox checks clearly distinguished from agreed live verification.'],
    questions:{
      ru:[
        ['Заказ виден в WooCommerce, но письмо не пришло. Что проверить?', 'Сначала выясню, должен ли этот статус заказа запускать нужное уведомление, включено ли оно и какой указан получатель. Затем проверю отдельно формирование письма, ответ почтового сервиса и поступление на контрольный адрес.'],
        ['Достаточно ли установить SMTP-плагин?', 'Нет, если магазин вообще не формирует нужное письмо или отправляет его не тому получателю. Успешное тестовое сообщение SMTP тоже не проверяет письмо о реальном заказе. Нужен контрольный сценарий с согласованным статусом и проверкой получения.'],
      ],
      en:[
        ['WooCommerce has the order, but the email did not arrive. What do you check?', 'First check whether that order status should trigger the intended notification, whether it is enabled and who should receive it. Then verify message creation, the mail provider response and receipt at an agreed test address separately.'],
        ['Is installing an SMTP plugin enough?', 'Not if the store never creates the email or sends it to the wrong recipient. A successful SMTP test message does not verify the actual order email. Use a test order with an agreed status and confirm receipt.'],
      ],
    },
  },
  'wordpress-performance': {
    ru: ['На телефоне долго виден пустой экран, а в админке всё быстро', 'Сравню загрузку типовых страниц для обычного посетителя. В магазине особенно важны не только первый экран и изображения, но и отсутствие регрессий в корзине, формах и аналитике.', 'Повторяемые замеры по согласованным страницам, список изменений и проверка ключевых функций. Отдельно покажу ограничения замеров и где ещё остаётся потенциал.'],
    en: ['The mobile page stays blank while the admin session feels fast', 'Compare representative pages as a logged-out visitor. For stores, check not only when the first screen appears, but also whether cart, forms and analytics still behave correctly.', 'Repeatable measurements on agreed pages, a change list and checks for essential workflows. Document measurement limits and remaining opportunities.'],
  },
  'web-analytics': {
    ru: ['Цели настроены, но цифры не сходятся с заказами', 'Начну с одного контрольного заказа или заявки. Отделю повторную отправку цели от повторной покупки, а загрузку страницы благодарности — от подтверждения оплаты.', 'Карта событий, шаги для проверки и примеры данных, которые удалось увидеть в аналитике. Отдельно отмечу, какие сценарии не тестировались и где источником факта остаётся магазин или платёжный сервис.'],
    en: ['Goals are set up, but the numbers do not match the orders', 'Start with one controlled order or enquiry. Distinguish duplicate event firing from a second purchase, and a thank-you page view from confirmed payment.', 'An event map, verification steps and examples of what reached analytics. Document untested flows and where the store or payment provider remains the source of truth.'],
  },
};
