// Prompts ask for enough information to scope a task without asking for access.
export const enquiryPrompts = {
  'wordpress-contact-form-repair': [
    ['Адрес страницы, сообщение формы или пример спама без контактов клиента', 'Время последней попытки и канал, куда должна поступить заявка'],
    ['Form page, response message or a redacted spam example', 'Time of the last attempt and the intended enquiry destination'],
  ],
  'wordpress-php-plugin-updates': [
    ['Что просит обновить хостинг или WordPress', 'Что должно работать после обновления и есть ли актуальная копия'],
    ['Requested hosting or WordPress update', 'What must keep working and whether a recent backup exists'],
  ],
  'woocommerce-digital-downloads': [
    ['Формат и примерный размер файла, количество товаров', 'Способ оплаты и как покупатель должен получать доступ'],
    ['File format, approximate size and number of products', 'Payment method and how buyers should access their downloads'],
  ],
  'woocommerce-store-improvements': [
    ['Страница или артикул и что происходит сейчас', 'Как должен работать сценарий и что нельзя менять'],
    ['Page or SKU and what currently happens', 'Expected behavior and what must stay unchanged'],
  ],
  'website-contact-widgets': [["Каналы связи и страницы, где нужен виджет","Установка на сайт или готовый фрагмент"],["Contact channels and pages that need the widget","Installation or ready-to-embed snippet"]],
  'corporate-email-signatures': [["Макет или пример и список полей","Число подписей и версии почтовых клиентов"],["Reference layout and fields","Signature count and target email client versions"]],
  'affiliate-link-audit': [
    ['Адрес витрины, период и тип ошибки в отчёте', 'Примеры страниц или товаров без трекинговых ключей и данных покупателей'],
    ['Storefront URL, relevant dates and the network error', 'Example pages or products without tracking keys or customer data'],
  ],
  'woocommerce-store-development': [
    ['Примеры товаров, вариантов и источник цен и остатков', 'Как покупатель оформляет, оплачивает и получает заказ'],
    ['Sample products, variations and source of prices and stock', 'How customers will order, pay and receive products'],
  ],
  'wordpress-business-website': [
    ['Какие услуги, разделы и материалы уже есть', 'Что должен сделать посетитель: позвонить, записаться или отправить заявку'],
    ['Services, planned sections and materials already available', 'What visitors should do: call, book or send an enquiry'],
  ],
  'wordpress-plugin-development': [
    ['Какое правило или функцию нужно добавить и где она работает', 'Пример, на котором правило не должно сработать'],
    ['The feature or rule you need and where it should run', 'An example that the rule must leave unaffected'],
  ],
  'website-ux-audit': [
    ['Страницы и устройства, где видна проблема', 'Какое действие посетитель не может завершить'],
    ['Affected pages and devices', 'What action the visitor cannot complete'],
  ],
  'affiliate-catalog-development': [
    ['Категория товаров и регион', 'Партнёрские программы и пример фида без ключей'],
    ['Product category and target region', 'Affiliate programs and a sample feed without access keys'],
  ],
  'b2b-catalog-and-enquiries': [
    ['Пример товара и какие характеристики важны покупателю', 'Как покупатель должен запросить цену или счёт'],
    ['Example product and key buyer specifications', 'How buyers should request a quote or invoice'],
  ],
  'ai-agent-workflows': [
    ['Повторяемая операция и пример входных данных', 'Что агенту разрешено делать и где нужен человек'],
    ['Recurring task and example input', 'What the agent may do and what requires a human decision'],
  ],
  'website-vps-maintenance': [
    ['Хостинг, примерный объём данных и симптомы', 'Допустимое окно работ и наличие резервной копии'],
    ['Hosting, estimated data size and symptoms', 'Maintenance window and whether a backup is available'],
  ],
  'laravel-catalog-development': [
    ['Какие данные хранить и откуда их получать', 'Пример каталога или фильтра, который нужен'],
    ['What data to store and where it comes from', 'Example catalog or filter you need'],
  ],
  'wordpress-repair': [
    ['Адрес страницы и как повторить ошибку', 'Что менялось перед сбоем и есть ли резервная копия'],
    ['Affected page and steps to reproduce the issue', 'What changed before the issue and whether a backup exists'],
  ],
  'website-redesign': [
    ['Какие страницы или сценарии нужно переработать', 'Что обязательно сохранить: адреса, каталог, формы или корзину'],
    ['Which pages or workflows need redesigning', 'What must stay intact: URLs, catalog, forms or cart'],
  ],
  'catalog-automation': [
    ['Образец CSV, XML или выгрузки поставщика без ключей', 'Как обновлять цены и остатки и какие поля не перезаписывать'],
    ['Sample CSV, XML or supplier feed without access keys', 'How to update prices and stock, and which fields to preserve'],
  ],
  'technical-seo': [
    ['Примеры проблемных URL и нужные поисковые системы', 'Когда заметили проблему и что менялось на сайте'],
    ['Example affected URLs and target search engines', 'When the issue started and what changed on the site'],
  ],
  'data-and-ai': [
    ['Пример исходных данных и желаемого результата', 'Как часто выполнять задачу и где нужна ручная проверка'],
    ['Sample input and desired output', 'How often this runs and where human review is needed'],
  ],
  'hosting-migration': [
    ['Текущий и новый хостинг, что переносим', 'Что должно остаться доступным и когда можно переключать'],
    ['Current and new hosting, and what needs moving', 'What must stay available and when the cutover can happen'],
  ],
  'checkout-payments': [
    ['Проблемный шаг корзины, доставки или оплаты', 'Способ оплаты или доставки и пример сценария без данных покупателя'],
    ['Affected cart, shipping or payment step', 'Payment or shipping method and an example without buyer data'],
  ],
  'woocommerce-catalog-filters': [
    ['Адрес категории и значение фильтра, при котором выдача неверна', 'Два артикула: какой товар должен остаться и какой должен скрыться'],
    ['Category URL and filter value that gives the wrong result', 'Two SKUs: one product that should remain and one that should disappear'],
  ],
  'woocommerce-shipping': [
    ['Способ доставки, тестовый город или индекс и ожидаемый тариф', 'Пример корзины: сумма, вес, самовывоз или ПВЗ и что видит гость — без адреса покупателя'],
    ['Shipping method, example city or postcode and expected rate', 'Sample cart value and weight, pickup or collection point, and what a guest sees; no customer address'],
  ],
  'wordpress-performance': [
    ['Какие страницы медленные и на каких устройствах', 'Что нельзя отключать или менять при ускорении'],
    ['Which pages are slow and on what devices', 'What must not be disabled or changed during optimization'],
  ],
  'web-analytics': [
    ['Какое действие или бизнес-результат нужно измерить', 'Какая аналитика уже настроена и где расходятся данные'],
    ['What action or business result needs tracking', 'Which analytics are in place and where the figures diverge'],
  ],
};

export function createEnquiry({lang, title, url, kind, serviceSlug, customPrompts}) {
  const ru = lang === 'ru';
  const specific = enquiryPrompts[serviceSlug]?.[ru ? 0 : 1];
  const prompts = customPrompts ?? specific ?? (ru
    ? ['Что происходит сейчас или какой сайт нужен', 'Как должен выглядеть результат']
    : ['What happens now or what site you need', 'What the result should look like']);
  const labels = ru
    ? ['Адрес сайта или ссылка на пример', ...prompts, 'Желаемые сроки']
    : ['Website or reference URL', ...prompts, 'Preferred timeline'];
  const prefix = kind === 'case'
    ? (ru ? 'Задача по примеру: ' : 'Project enquiry: ')
    : kind === 'guide'
    ? (ru ? 'Вопрос по руководству: ' : 'Guide enquiry: ')
    : (ru ? 'Запрос по услуге: ' : 'Service enquiry: ');
  const source = kind === 'case'
    ? (ru ? 'Кейс, на который я ссылаюсь: ' : 'Reference case: ')
    : kind === 'guide' ? (ru ? 'Руководство: ' : 'Reference guide: ')
    : (ru ? 'Страница услуги: ' : 'Service page: ');
  const subject = prefix + title;
  const body = [
    ...labels.map(label => label + ':'),
    source + url,
  ].join('\r\n\r\n');
  const telegramText = subject+'\n\n'+body.replaceAll('\r\n','\n');
  return {
    prompts,
    href:'mailto:zakaz@wp.org.ru?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body),
    telegramHref:'https://t.me/wporgru?text='+encodeURIComponent(telegramText),
  };
}
