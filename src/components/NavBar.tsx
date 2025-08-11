interface NavItem {
  title: string;
  name: string;
  URL: string;
  target?: string;
}

class NavBar extends HTMLElement {
  private dark = true;
  private title = 'GitHub 中文版';

  private channels: NavItem[] = [
    {
      title: 'G 流',
      name: '事件流', 
      URL: 'page/Event.html?data=events'
    },
    {
      title: 'G 仓',
      name: '开源仓库',
      URL: 'page/Repository/index.html'
    },
    {
      title: 'G 锦', 
      name: '代码锦囊',
      URL: 'page/Gist/index.html'
    },
    {
      title: 'G 友',
      name: '程序员',
      URL: 'page/User/index.html?data=users'
    },
    {
      title: 'G 团',
      name: '开发团队', 
      URL: 'page/User/index.html?data=organizations'
    },
    {
      title: '关于本站',
      URL: 'ReadMe.md'
    },
    {
      title: '关于作者',
      URL: 'page/User/detail.html?data=users/TechQuery'
    }
  ];

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <nav class="navbar navbar-fixed-top ${this.dark ? 'navbar-inverse' : ''}">
        <div class="container">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button 
              type="button" 
              class="navbar-toggle collapsed"
              data-toggle="collapse" 
              data-target="#Main_Nav" 
              aria-expanded="false"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="" title="返回首页">
              ${this.title}
            </a>
          </div>
          
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="Main_Nav">
            
            <form class="navbar-form navbar-left" id="search-form">
              <div class="form-group">
                <input 
                  type="search" 
                  class="form-control"
                  name="keyword" 
                  required
                  placeholder="定位：用户 ID、仓库全名" 
                />
              </div>
            </form>

            <ul class="nav navbar-nav">
              ${this.channels.map((channel, index) => `
                <li role="${channel.URL ? '' : 'separator'}" 
                    class="${channel.URL ? '' : 'divider'}">
                  <a 
                    target="${channel.target || ''}" 
                    href="${channel.URL}"
                    title="${channel.name}"
                    ${index === 0 ? 'data-autofocus="true"' : ''}
                  >
                    ${channel.title}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </nav>
    `;
  }

  setupEventListeners() {
    const searchForm = this.querySelector('#search-form') as HTMLFormElement;
    if (searchForm) {
      searchForm.addEventListener('submit', this.handleSearch.bind(this));
    }
  }

  handleSearch(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const keyword = (form.elements.namedItem('keyword') as HTMLInputElement).value;
    
    if (keyword.indexOf('/') < 0) {
      // User search
      window.location.hash = `#/users/${keyword}`;
    } else {
      // Repository search  
      window.location.hash = `#/repos/${keyword}`;
    }
  }
}

// Register the custom element
customElements.define('nav-bar', NavBar);