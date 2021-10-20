import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Icon,
    Loading,
    Message,
    MessageBox,
    Notification,
    Container,
    Header,
    Aside,
    Main,
    Row,
    Col,
    Submenu,
    Menu,
    MenuItem,
    MenuItemGroup,
    Radio,
  RadioGroup,
  RadioButton,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Dialog,
  Tag,
  Tree,
  Select,
  Option,
  Cascader, 
  OptionGroup,
} from 'element-ui'
// import { el-form } from 'element-ui'
Vue.use(Cascader);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Tree);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(Card);
Vue.use(BreadcrumbItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Loading.directive)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service