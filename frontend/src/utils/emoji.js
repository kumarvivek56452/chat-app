export const funEmoji =[
    "😃",
    '😘',
    '🥰',
    '🤩',
    '🤗',
    '😻',
    '🙌',
    '🎉',
    '🎊',
    '🥳',
    '🤟',
    '✌️',
    '🤗',
    '😻',
    '🙌',
    '🎉',
    '🎊',
    '🥳',
]

export const getFunEmoji=()=>{
    return funEmoji[Math.floor(Math.random() * funEmoji.length-1)]
}