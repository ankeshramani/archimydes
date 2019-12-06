import AboutUsPage from "views/AboutUsPage/AboutUsPage.jsx";
import BlogPostPage from "views/BlogPostPage/BlogPostPage.jsx";
import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.jsx";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.jsx";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.jsx";
import EcommercePage from "views/EcommercePage/EcommercePage.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import PresentationPage from "views/PresentationPage/PresentationPage.jsx";
import PricingPage from "views/PricingPage/PricingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import ProductPage from "views/ProductPage/ProductPage.jsx";
import SectionsPage from "views/SectionsPage/SectionsPage.jsx";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import ProjectListPage from "views/ProjectListPage/ProjectListPage.jsx";
import CreateProjectPage from "views/ProjectListPage/CreateProjectPage.jsx";
import ChangePasswordPage from "views/ChangePasswordPage/ChangePasswordPage.jsx";
import DashboardPage from "views/AdminPage/DashboardPage.jsx";
import SprintReview from "views/SprintPage/SprintReview.jsx";
import SprintList from "views/SprintPage/SprintList.jsx";
import SprintPage from "views/AdminPage/SprintPage.jsx";
import CreditPage from "views/CreditPage/CreditPage.jsx";
import UserList from "views/UserList/userList.jsx";
import UserDeatils from "views/UserDetail/UserDeatils";
import CreateUsers from "views/CreateUsers/CreateUsers.jsx";
import UserStoryStatus from "views/UserStoryStatus/UserStoryStatus.jsx";
import DiscountManagement from "views/DiscountManagement/DiscountManagement";
import SprintSubmissionPage from "views/SprintSubmissionPage/SprintSubmissionPage";
import PurchasePackage from "views/PurchasePackages/PurchasePackages";

export const indexRoutes = [
    {path: "/about-us", name: "AboutUsPage", component: AboutUsPage},
    {path: "/blog-post", name: "BlogPostPage", component: BlogPostPage},
    {path: "/blog-posts", name: "BlogPostsPage", component: BlogPostsPage},
    {path: "/components", name: "Components", component: ComponentsPage},
    {path: "/contact-us", name: "ContactUsPage", component: ContactUsPage},
    {path: "/ecommerce-page", name: "EcommercePage", component: EcommercePage},
    {path: "/landing-page", name: "LandingPage", component: LandingPage},
    {path: "/login-page", name: "LoginPage", component: LoginPage},
    {path: "/pricing", name: "PricingPage", component: PricingPage},
    {path: "/product-page", name: "ProductPage", component: ProductPage},
    {path: "/sections", name: "SectionsPage", component: SectionsPage},
    {
        path: "/shopping-cart-page",
        name: "ShoppingCartPage",
        component: ShoppingCartPage
    },
    {
        path: "/change-password",
        name: "ChangePasswordPage",
        component: ChangePasswordPage
    },
    {path: "/signup-page", name: "SignupPage", component: SignupPage},
    {path: "/presentation-page", name: "PresentationPage", component: PresentationPage},
];

export const privateRoutes = [
  {path: "/credits", name: "CreditPage", component: CreditPage},
  {path: "/profile-page", name: "ProfilePage", component: ProfilePage},
  {path: "/new", name: "CreateProjectPage", component: CreateProjectPage},
  {path: "/projects/:id/sprints", name: "SprintList", component: SprintList},
  {path: "/projects/:id/sprint/review", name: "SprintReview", component: SprintReview},
  {path: "/admin/projects/:id/sprints", name: "SprintPage", component: SprintPage},
  {path: "/admin/projects", name: "DashboardPage", component: DashboardPage},
  {path: "/user-list", name: "UserListPage", component: UserList},
  {path: "/admin/users", name: "CreateUserPage", component: CreateUsers},
  {path: "/user-story-status", name: "UserStoryStatus", component: UserStoryStatus},
  {path: "/user-details", name: "UserDetails", component: UserDeatils},
  {path: "/projects/:id/sprint/status", name: "SprintSubmissionPage", component: SprintSubmissionPage},
  {path: "/purchase-package", name: "PurchasePackage", component: PurchasePackage},
  {path: "/", name: "ProjectListPage", component: ProjectListPage},
  {path: "/discount-management", name: "DiscountManagement", component: DiscountManagement},

];