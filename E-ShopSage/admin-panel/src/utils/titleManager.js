import React from 'react'
// Title Manager Utility
// This utility helps manage dynamic page titles
const BASE_TITLE = import.meta.env.VITE_APP_TITLE || 'E-ShopSage Admin Panel'
/**
 * Set the document title
 * @param {string} title - The title to set
 * @param {boolean} appendBase - Whether to append the base title
 */
export const setTitle = (title, appendBase = true) => {
    if (appendBase) {
        document.title = `${title} - ${BASE_TITLE}`
    } else {
        document.title = title
    }
}

/**
 * Set title for specific pages
 */
export const setPageTitle = {
    dashboard: () => setTitle('Dashboard'),
    profile: () => setTitle('Profile'),
    editProfile: () => setTitle('Edit Profile'),
    login: () => setTitle('Login'),
    settings: () => setTitle('Settings'),
    users: () => setTitle('Users'),
}

/**
 * Reset title to base title
 */
export const resetTitle = () => {
    document.title = BASE_TITLE
}

/**
 * Get the base title
 */
export const getBaseTitle = () => BASE_TITLE

/**
 * Custom hook for managing titles in components
 */
export const useTitle = (title, appendBase = true) => {
    React.useEffect(() => {
        setTitle(title, appendBase)
        // Reset title when component unmounts
        return () => {
            resetTitle()
        }
    }, [title, appendBase])
} 