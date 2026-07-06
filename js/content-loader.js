document.addEventListener('DOMContentLoaded', function() {
    const data = window.SITE_CONTENT;
    if (!data) {
        console.error('Site content not found. Make sure js/content-data.js is loaded.');
        return;
    }

    const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const pageKey = path === 'coaching-sante' ? 'sante' : path;
    const pageData = data[pageKey];
    const common = data.common;

    // Helper to get nested properties from an object (e.g., 'nav_items.expertise')
    const getNestedProperty = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Function to populate elements by data-content attribute
    const populateByDataContent = (container, contentData) => {
        container.querySelectorAll('[data-content], [data-attr]').forEach(el => {
            const key = el.getAttribute('data-content');
            if (key) {
                const value = getNestedProperty(contentData, key);
                if (value !== undefined) {
                    el.innerHTML = value;
                }
            }

            const attrRaw = el.getAttribute('data-attr');
            if (attrRaw) {
                const [attr, contentKey] = attrRaw.split(':');
                const attrValue = getNestedProperty(contentData, contentKey);
                if (attrValue !== undefined) {
                    if (attr === 'href') {
                        if (contentKey === 'phone') el.href = `tel:${attrValue.replace(/\./g, '')}`;
                        else if (contentKey === 'email') el.href = `mailto:${attrValue}`;
                        else el.href = attrValue;
                    } else {
                        el.setAttribute(attr, attrValue);
                    }
                }
            }
        });
    };

    // Populate common elements
    if (common) {
        // Brand Name
        const brandLink = document.querySelector('nav .font-headline-md a span');
        if (brandLink) brandLink.innerText = common.nav.brand_name;

        // Nav Links
        const navContainer = document.querySelector('nav .hidden.md\\:flex');
        if (navContainer) {
            navContainer.querySelectorAll('a').forEach(a => {
                const href = a.getAttribute('href');
                if (href === 'index.html') a.innerText = common.nav.home;
                else if (href === 'hypnocoaching.html') a.innerText = common.nav.hypnocoaching;
                else if (href === 'coaching-sante.html') a.innerText = common.nav.sante;
                else if (href === 'expertise.html') a.innerText = common.nav.expertise;
                else if (href === 'parcours.html') a.innerText = common.nav.parcours;
            });
            const ctaBtn = navContainer.querySelector('button');
            if (ctaBtn) ctaBtn.innerText = common.nav.cta;
        }

        // Footer
        const footer = document.querySelector('footer');
        if (footer) {
            populateByDataContent(footer, common.footer);

            footer.querySelectorAll('[data-content-list]').forEach(container => {
                const key = container.getAttribute('data-content-list');
                const items = common.footer[key];
                if (items && Array.isArray(items)) {
                     const template = container.querySelector('li');
                     if (template) {
                        container.innerHTML = '';
                        items.forEach(item => {
                            const clone = template.cloneNode(true);
                            const link = clone.querySelector('a');
                            if (link) {
                                const icon = link.querySelector('span');
                                link.innerText = item;
                                if (icon) link.prepend(icon);
                            } else {
                                const textTarget = clone.querySelector('span:last-child') || clone;
                                textTarget.innerText = item;
                            }
                            container.appendChild(clone);
                        });
                     }
                }
            });
        }

        // Contact Section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            populateByDataContent(contactSection, common.contact);

            const select = contactSection.querySelector('select');
            if (select && common.contact.form_profiles) {
                select.innerHTML = '';
                common.contact.form_profiles.forEach(profile => {
                    const opt = document.createElement('option');
                    opt.value = profile;
                    opt.innerText = profile;
                    select.appendChild(opt);
                });
            }
        }
    }

    // Populate page specific elements
    if (pageData) {
        populateByDataContent(document.querySelector('main'), pageData);

        document.querySelectorAll('main [data-content-list]').forEach(container => {
            const key = container.getAttribute('data-content-list');
            const items = pageData[key];
            if (items && Array.isArray(items)) {
                const template = container.querySelector('li') || container.querySelector(':scope > div');
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
