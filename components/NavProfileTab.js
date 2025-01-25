import Link from "next/link";
import { useTranslation } from "next-i18next";

const NavProfileTab = () => {
    const { t } = useTranslation("common");

    return (
        <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
                className="nav-link dropdown-toggle hide-arrow p-0"
                href="#"
                data-bs-toggle="dropdown"
            >
                <div className="avatar avatar-online">
                    <img src="/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <Link href="/profile" className="dropdown-item mt-0">
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                                <div className="avatar avatar-online">
                                    <img src="/img/avatars/1.png" alt="Avatar" className="rounded-circle" />
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0">John Doe</h6>
                                <small className="text-muted">{t("admin")}</small>
                            </div>
                        </div>
                    </Link>
                </li>
                <li>
                    <div className="dropdown-divider my-1 mx-n2"></div>
                </li>
                <li>
                    <Link href="/profile" className="dropdown-item">
                        <i className="ti ti-user me-3 ti-md"></i>
                        <span className="align-middle">{t("profile")}</span>
                    </Link>
                </li>
                <li>
                    <div className="dropdown-divider my-1 mx-n2"></div>
                </li>
                <li>
                    <Link href="/settings" className="dropdown-item">
                        <i className="ti ti-settings me-3 ti-md"></i>
                        <span className="align-middle">{t("settings")}</span>
                    </Link>
                </li>
                <li>
                    <div className="dropdown-divider my-1 mx-n2"></div>
                </li>
                <li>
                    <div className="d-grid px-2 pt-2 pb-1">
                        <Link href="/logout" className="btn btn-sm btn-danger d-flex">
                            <small className="align-middle">{t("logout")}</small>
                            <i className="ti ti-logout ms-2 ti-14px"></i>
                        </Link>
                    </div>
                </li>
            </ul>
        </li>
    );
};

export default NavProfileTab;
