import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from '../Store/Store'


const useStyles = makeStyles(theme => ({
    root: {
        margin: '40px',
        padding: theme.spacing(3, 2),
        textAlign: 'center'
    },
    flex:{
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
         width: '30%',
         height: '400px',
         borderRight: '1px solid black'
    },
    chatWindow: {
         width: '70%',
         height: '400px',
         padding: '20px'
    },
    chatBox: {
         width: '85%'
    },
    button: {
         width: '15%'
    },
}));

export default function Dashboard() {


    const classes = useStyles();
    const {allChats, sendChatAction, user} = React.useContext(CTX);
    const topics  = Object.keys(allChats);
    const [textValue, changeTextValue] = React.useState('');
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h4" component="h4">
                    Chat o Tajlandii :)
                </Typography>
                <Typography variant="h5" component="h5">
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map(topic =>(
                                    <ListItem onClick={e=> changeActiveTopic(e.target.innerText)} key={topic} button>
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                ))
                            }

                        </List>

                    </div>
                    <div className={classes.chatWindow}>

                            {
                                allChats[activeTopic].map((chat, i) =>(
                                    <div className={classes.flex} key={i} >
                                        <Chip label={chat.from} className={classes.chip} />
                                        <Typography variant = 'body1' gutterBottom>{chat.message}</Typography>
                                    </div>
                                ))
                            }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label="Napisz wiadomość"
                        className={classes.chatBox}
                        onChange={e => changeTextValue(e.target.value)}
                        value={textValue}
                    />
                    <Button variant="contained" color="primary" className={classes.button}
                    onClick={()=> {
                        sendChatAction({from: user, message: textValue, topic: activeTopic});
                        changeTextValue('');
                    }}
                    >
                        Wyślij
                    </Button>
                </div>
            </Paper>
        </div>
    );
}