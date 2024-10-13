import hljs from 'highlight.js/lib/common'
import "highlight.js/styles/atom-one-light.css";
import markdownit from 'markdown-it'

export const md = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { }
        }
        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
    }
})
