document.addEventListener('DOMContentLoaded', function() {
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
            const pageKey = path === 'coaching-sante' ? 'sante' : path;
            const pageData = data[pageKey];
            const common = data.common;

            // Function to populate elements
            const populate = (container, contentData) => {
                container.querySelectorAll('[data-content]').forEach(el => {
                    const key = el.getAttribute('data-content');
                    if (contentData[key]) {
                        if (Array.isArray(contentData[key])) {
                            // Handle lists if needed, but for now we assume simple string or pre-rendered list
                            // If it's a list, we might need more logic
                        } else {
                            el.innerHTML = contentData[key];
                        }
                    }
                });
            };

            // Populate common elements (nav, footer, contact)
            if (common) {
                // Nav
                document.querySelectorAll('nav a').forEach(a => {
                    const href = a.getAttribute('href');
                    if (href === 'index.html') a.innerText = common.nav.home;
                    else if (href === 'hypnocoaching.html') a.innerText = common.nav.hypnocoaching;
                    else if (href === 'coaching-sante.html') a.innerText = common.nav.sante;
                    else if (href === 'expertise.html') a.innerText = common.nav.expertise;
                    else if (href === 'parcours.html') a.innerText = common.nav.parcours;
                });
                const ctaBtn = document.querySelector('nav button');
                if (ctaBtn) ctaBtn.innerText = common.nav.cta;

                // Footer
                const footer = document.querySelector('footer');
                if (footer) {
                    const tagline = footer.querySelector('p');
                    if (tagline) tagline.innerText = common.footer.tagline;
                    const headings = footer.querySelectorAll('h4');
                    if (headings[0]) headings[0].innerText = common.footer.localities_title;
                    if (headings[1]) headings[1].innerText = common.footer.nav_title;
                    if (headings[2]) headings[2].innerText = common.footer.legal_title;
                    const copyright = footer.querySelector('p.font-body-md.text-surface-variant\\/60');
                    if (copyright) copyright.innerText = common.footer.copyright;
                }

                // Contact Section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const title = contactSection.querySelector('h2');
                    if (title) title.innerText = common.contact.title;
                    const desc = contactSection.querySelector('p');
                    if (desc) desc.innerText = common.contact.description;
                    const infos = contactSection.querySelectorAll('.font-body-md');
                    if (infos[0]) infos[0].innerText = common.contact.location;
                    if (infos[1]) infos[1].innerText = common.contact.email;

                    const labels = contactSection.querySelectorAll('label');
                    if (labels[0]) labels[0].innerText = common.contact.form_name;
                    if (labels[1]) labels[1].innerText = common.contact.form_profile;
                    if (labels[2]) labels[2].innerText = common.contact.form_email;
                    if (labels[3]) labels[3].innerText = common.contact.form_message;

                    const submitBtn = contactSection.querySelector('button');
                    if (submitBtn) {
                        const icon = submitBtn.querySelector('span');
                        submitBtn.innerText = common.contact.form_submit;
                        if (icon) submitBtn.appendChild(icon);
                    }
                }
            }

            // Populate page specific elements
            if (pageData) {
                document.querySelectorAll('[data-content]').forEach(el => {
                    const key = el.getAttribute('data-content');
                    if (pageData[key]) {
                        if (Array.isArray(pageData[key])) {
                            // If it's a list (like in expertise or timeline)
                            // We expect a specific structure or we don't handle it here
                        } else {
                            el.innerHTML = pageData[key];
                        }
                    }
                });

                // Specific handling for lists if they have data-content-list
                document.querySelectorAll('[data-content-list]').forEach(container => {
                    const key = container.getAttribute('data-content-list');
                    const items = pageData[key];
                    if (items && Array.isArray(items)) {
                        const template = container.querySelector('li') || container.querySelector('div');
                        if (template) {
                            const isTimeline = key === 'timeline';
                            container.innerHTML = '';
                            items.forEach(item => {
                                const clone = template.cloneNode(true);
                                if (typeof item === 'string') {
                                    const span = clone.querySelector('span:last-child') || clone;
                                    span.innerText = item;
                                } else if (isTimeline) {
                                    const year = clone.querySelector('.text-secondary');
                                    const title = clone.querySelector('h3');
                                    const desc = clone.querySelector('p');
                                    if (year) year.innerText = item.year;
                                    if (title) title.innerText = item.title;
                                    if (desc) desc.innerText = item.desc;
                                }
                                container.appendChild(clone);
                            });
                        }
                    }
                });
            }
        });
});
