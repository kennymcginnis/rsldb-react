import { makeMediaQuery } from 'lib/makeMediaQuery'

export const palette = {
    primary: { main: '#F9C606' },
    secondary: {
        main: '#C23F27',
        faded: '#C23F2799',
    },
    error: {},
    info: {},
    success: {},
    warning: {},
    common: {
        dark: {
            main: '#1F1F1F',
            faded: '#231F20CC',
        },
        medium: '#CBD0D3',
        light: '',
        white: {
            main: '#FFF',
            faded: '#FFFFFFBF'
        },
        bronze: '#705F3A',
        mediumGray: '#808284'
    }
}
export const fonts = {
    family: {}
}
export const ruler = {
    content: {
        width: '108rem'
    },
    menuContent: {
        width: '158.7rem'
    },
    header: {
        height: '7.1rem'
    },
    footer: {
        height: '22.5rem'
    },
    menuNav: {
        height: '9.4rem',
        mobileHeight: '8.2rem',
    },
    locationBar: { height: '3.5rem' },
    button: {
        height: '4.2rem',
        innerHeight: '3.2rem',
        mobileHeight: '3.5rem',
        mobileInnerHeight: '2.5rem'
    },
    hero: {
        mobileHeight: '68.5rem'
    },
    section: {
        height: '47.5rem'
    },
    diptych: {
        height: '68.2rem'
    },
    craftworksFoundation: {
        height: '40rem'
    },
    // Mobile
    logoWrapper: {
        height: '10.5rem'
    },
    bottomNav: {
        height: '5rem',
    }
}
export const zIndex = {
    header: 100,
    footer: 100,
    sendBack: -1,
    bringForward: 1,
    menuOrderButton: 2,
}

export const mq = makeMediaQuery()
