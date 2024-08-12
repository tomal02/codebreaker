"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChartBar } from "@fortawesome/free-solid-svg-icons";

import styles from "./nav.module.css";
import AnimatedLogo from "./animatedLogo";
import Login from "./modals/login";
import Stats from "./modals/stats";
import Profile from "./modals/profile";
import Settings from "./modals/settings";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isStatsModalOpen, setStatsModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAuthenticated = false;

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div>
          <Link href="/">
            <AnimatedLogo style={{ width: "400px", height: "80px" }} />
          </Link>
        </div>
        <div className={styles.menuContainer}>
          <button
            className={styles.statsButton}
            onClick={() => setStatsModalOpen(true)}
          >
            <FontAwesomeIcon icon={faChartBar} />
            Stats
          </button>
          <div className={styles.profileWrapper} ref={dropdownRef}>
            <div className={styles.profileIcon} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setSettingsModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      Settings
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setProfileModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setSettingsModalOpen(true);
                        setDropdownOpen(false);
                      }}
                      className={styles.dropdownItem}
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Modals */}

      <Stats
        showModal={isStatsModalOpen}
        toggleModal={() => setStatsModalOpen(false)}
      />

      <Login
        showModal={isLoginModalOpen}
        toggleModal={() => setLoginModalOpen(false)}
      />

      <Profile
        showModal={isProfileModalOpen}
        toggleModal={() => setProfileModalOpen(false)}
      />

      <Settings
        showModal={isSettingsModalOpen}
        toggleModal={() => setSettingsModalOpen(false)}
      />
    </>
  );
}
