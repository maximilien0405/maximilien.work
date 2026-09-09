import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MetaTagsService {
  private readonly siteUrl = 'https://www.maximilien.work';
  private readonly ogImage = 'https://www.maximilien.work/assets/images/moi-placeholder.png';

  constructor(
    private meta: Meta,
    private title: Title,
    private translate: TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  // Update meta tags for the current route
  public updateMetaTags(routePath: string = '/') {
    const path = this.normalizePath(routePath);
    const lang = this.translate.getCurrentLang() || localStorage.getItem('lang') || 'fr';
    const seo = this.getSeoByRoute(path, lang);
    const canonicalUrl = `${this.siteUrl}${path === '/' ? '/' : path}`;
    const isNoIndex = path.startsWith('/client-dashboard') || path.startsWith('/payement');
    const locale = lang === 'en' ? 'en_US' : 'fr_FR';

    this.document.documentElement.setAttribute('lang', lang);
    this.updateCanonicalTag(canonicalUrl);
    this.updateStructuredData(seo.title, seo.description, canonicalUrl, lang);
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'title', content: seo.title });
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    this.meta.updateTag({ name: 'robots', content: isNoIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:image', content: this.ogImage });
    this.meta.updateTag({ property: 'og:locale', content: locale });
    this.meta.updateTag({ property: 'og:site_name', content: 'Maximilien Z.' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: this.ogImage });
  }

  // Normalize route path
  private normalizePath(routePath: string): string {
    const clean = (routePath || '/').split('?')[0].split('#')[0];
    if (!clean || clean === '/home') return '/';
    return clean.startsWith('/') ? clean : `/${clean}`;
  }

  // SEO content by route + lang
  private getSeoByRoute(path: string, lang: string) {
    const isEn = lang === 'en';
    const pages: Record<string, { title: string; description: string; keywords: string }> = {
      '/': {
        title: isEn ? 'Maximilien Zimmermann — Web developer & designer' : 'Maximilien Zimmermann — Développeur & designer web',
        description: isEn
          ? 'Web developer & designer full of ideas to take your project to the next level.'
          : 'Développeur & designer web débordant d\'idées afin de porter votre projet au next-level.',
        keywords: isEn
          ? 'web developer, web designer, frontend, portfolio, Maximilien Zimmermann'
          : 'développeur web, web designer, frontend, portfolio, Maximilien Zimmermann',
      },
      '/realisations': {
        title: isEn ? 'Work — Maximilien Z.' : 'Réalisations — Maximilien Z.',
        description: isEn
          ? 'Selected web design and development projects.'
          : 'Quelques réalisations en web design et développement web.',
        keywords: isEn ? 'portfolio, projects, web design, development' : 'portfolio, projets, web design, développement',
      },
      '/services': {
        title: isEn ? 'Services — Maximilien Z.' : 'Services — Maximilien Z.',
        description: isEn
          ? 'Web development, web design, SEO and performance.'
          : 'Développement web, web design, référencement et performances.',
        keywords: isEn ? 'web development, web design, SEO' : 'développement web, web design, SEO',
      },
      '/blog': {
        title: isEn ? 'Blog — Maximilien Z.' : 'Blog — Maximilien Z.',
        description: isEn ? 'Articles about web development and design.' : 'Articles sur le développement web et le design.',
        keywords: isEn ? 'blog, web, articles' : 'blog, web, articles',
      },
      '/contact': {
        title: isEn ? 'Contact — Maximilien Z.' : 'Contact — Maximilien Z.',
        description: isEn
          ? 'Get in touch for a project or a question.'
          : 'Contactez-moi pour un projet ou une question.',
        keywords: isEn ? 'contact, hire, web developer' : 'contact, freelance, développeur web',
      },
      '/contact/success': {
        title: isEn ? 'Message sent — Maximilien Z.' : 'Message envoyé — Maximilien Z.',
        description: isEn ? 'Your message was sent successfully.' : 'Votre message a été envoyé avec succès.',
        keywords: 'contact',
      },
    };

    if (path.startsWith('/realisation/')) {
      return {
        title: isEn ? 'Project — Maximilien Z.' : 'Réalisation — Maximilien Z.',
        description: isEn ? 'Project details.' : 'Détails d\'une réalisation.',
        keywords: isEn ? 'project, portfolio' : 'projet, portfolio',
      };
    }

    return pages[path] || pages['/'];
  }

  // Canonical link
  private updateCanonicalTag(url: string) {
    let canonicalTag = this.document.querySelector("link[rel='canonical']");
    if (!canonicalTag) {
      canonicalTag = this.document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', url);
  }

  // Person + WebSite + WebPage JSON-LD
  private updateStructuredData(pageTitle: string, description: string, canonicalUrl: string, lang: string) {
    const existingTag = this.document.getElementById('dynamic-webpage-jsonld');
    if (existingTag) existingTag.remove();

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': `${this.siteUrl}/#person`,
          name: 'Maximilien Zimmermann',
          url: this.siteUrl,
          image: this.ogImage,
          jobTitle: lang === 'en' ? 'Web developer & designer' : 'Développeur & designer web',
          sameAs: [
            'https://www.linkedin.com/in/maximilien-zimmermann/',
            'https://github.com/maximilien0405',
            'https://www.behance.net/max-zim',
            'https://medium.com/@maximilien.z',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          name: 'Maximilien Z.',
          url: this.siteUrl,
          inLanguage: [lang],
          publisher: { '@id': `${this.siteUrl}/#person` },
        },
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: pageTitle,
          description,
          inLanguage: lang,
          isPartOf: { '@id': `${this.siteUrl}/#website` },
        },
      ],
    };

    const scriptTag = this.document.createElement('script');
    scriptTag.id = 'dynamic-webpage-jsonld';
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(structuredData);
    this.document.head.appendChild(scriptTag);
  }
}
