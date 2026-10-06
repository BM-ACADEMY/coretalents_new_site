import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

// Site paths go through the router; full URLs open in a new tab.
// In the admin preview links are shown but do not navigate.
function PopupLink({ to, preview, onClick, children, ...rest }) {
  if (preview) return <a href={to} {...rest} onClick={(e) => e.preventDefault()}>{children}</a>;
  if (/^https?:\/\//i.test(to)) return <a href={to} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>{children}</a>;
  return <Link to={to} onClick={onClick} {...rest}>{children}</Link>;
}

// The popup card itself - used by the live site (SitePopup) and by the admin preview.
// Image popups: the whole image is the link. Content popups: heading, text, one button.
export default function PopupView({ popup, imageSrc, onClose, onAction, preview = false, titleId, cardProps }) {
  const x = <button type="button" className="pop-x" aria-label="Close" onClick={() => onClose?.('x')}>&times;</button>;

  if (popup.type === 'image') {
    const img = imageSrc ? <img src={imageSrc} alt={popup.imageAlt || ''} /> : null;
    return (
      <motion.div className="pop-card pop-card-img" style={{ '--pw': popup.width, '--ph': popup.height }} {...cardProps}>
        {popup.linkUrl
          ? <PopupLink className="pop-img" to={popup.linkUrl} preview={preview} onClick={onAction} data-autofocus>{img}</PopupLink>
          : <div className="pop-img">{img}</div>}
        {x}
      </motion.div>
    );
  }

  return (
    <motion.div className="pop-card" {...cardProps}>
      {x}
      <h2 id={titleId}>{popup.heading}</h2>
      {popup.body && <p>{popup.body}</p>}
      {popup.buttonLabel && popup.buttonUrl && (
        <PopupLink className="btn btn-primary btn-lg btn-block" to={popup.buttonUrl} preview={preview} onClick={onAction} data-autofocus>
          {popup.buttonLabel}
        </PopupLink>
      )}
      <button type="button" className="pop-no" onClick={() => onClose?.('no_thanks')}>No thanks</button>
    </motion.div>
  );
}
