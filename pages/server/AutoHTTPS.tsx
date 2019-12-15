import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Checkbox,
  CardActions,
  Button,
  Collapse,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { Server } from "./index";

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))


export interface Props {
  config: Server['automatic_https']
}

export const AutoHTTPS: React.StatelessComponent<Props> = ({ config }) => {
  const classes = useStyles(useTheme())
  const [skip1, setSkip1] = useState(true)
  const [skip2, setSkip2] = useState(true)
  return (
    <Card>
      <CardHeader title={'HTTPS 配置'}></CardHeader>
      <CardContent>
        <List>
          <ListItem>
            <ListItemText primary={"自动续签 HTTPS"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!config.disable}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary={"HTTP 跳转 HTTPS"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!config.disable_redirects}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={() => setSkip1(!skip1)}>
            <ListItemText primary={"不启用自动续签的域名"}></ListItemText>
            <ListItemSecondaryAction>
              {skip1 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={skip1}>
            <List component="div" disablePadding>
              {(config.skip || ['没有']).map(h => (
                <ListItem key={h} className={classes.nested}>
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem button onClick={() => setSkip2(!skip2)}>
            <ListItemText primary={"skip_certificates (不太清楚)"}></ListItemText>
            <ListItemSecondaryAction>
              {skip2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={skip2}>
            <List component="div" disablePadding>
              {(config.skip_certificates || ['没有']).map(h => (
                <ListItem key={h} className={classes.nested}>
                  <ListItemText primary={h} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem>
            <ListItemText primary={"忽略已存在的证书"}></ListItemText>
            <ListItemSecondaryAction>
              <Switch checked={!!config.ignore_loaded_certificates}></Switch>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
