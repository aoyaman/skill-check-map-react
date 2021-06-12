import React from 'react';
// import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// const styles = (theme: any) => ({
//   listItem: {
//     marginTop: theme.spacing(1),
//   },
// });

// const options = {
//   overrides: {
//     h1: {
//       component: Typography,
//       props: {
//         gutterBottom: true,
//         variant: 'h5',
//       },
//     },
//     h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
//     h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
//     h4: {
//       component: Typography,
//       props: { gutterBottom: true, variant: 'caption', paragraph: true },
//     },
//     p: { component: Typography, props: { paragraph: true } },
//     a: { component: Link },
//     li: {
//       component: withStyles(styles)(({ classes, ...props }) => (
//         <li className={classes.listItem}>
//           <Typography component="span" {...props} />
//         </li>
//       )),
//     },
//   },
// };

// export default function Markdown(props) {
//   // return <ReactMarkdown options={options} {...props} />;
//   return <div {...props} />;
// }

type Props = {
  className: any;
  key: any;
  children: any;
}

const Markdown: React.FC<Props> = ({className, key, children}) => (
  <div className={className} key={key}>{children}</div>
);

export default Markdown;
