import { makeStyles } from "@material-ui/core";
import { Alert, AlertProps } from "@material-ui/lab";
import React, { FC, useCallback, useEffect, useState } from "react";

const useStyles = makeStyles({
	root: {
		position: "fixed",
		transform: "translate(-50%, 0)",
		left: "50%",
		top: "15%",
		zIndex: 1600,
		opacity: "90%",
	},
	hide: {
		visibility: "hidden",
		opacity: "0",
		transition: "all .4s",
	},
});

interface IAlertHover extends AlertProps {
	fadeTime?: number; // Defaults to 4000 ms
	children?: React.ReactNode;

	// Use setChildren property to reset the childen after hiding the alert.
	// This function run 400 ms after the alert starts to hide.
	// This property is necessary for rerendering the alert with the same message.
	// Throws an error if the children property is set, but not the setChildren property.
	setChildren?: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const AlertHover: FC<IAlertHover> = ({
	fadeTime,
	className,
	children,
	setChildren,
	id,
	onClose,
	...rest
}) => {
	const [viewAlert, setViewAlert] = useState(false);
	const [, setTimer] = useState<NodeJS.Timeout | undefined>();

	const classes = useStyles();

	const getId = useCallback(() => {
		let alertId = "_alertHover";
		if (id) alertId += ` ${id}`;
		return alertId;
	}, [id]);

	const getClassNames = useCallback(() => {
		let alertClassNames = `${classes.root} ${className}`;
		if (!viewAlert) alertClassNames += ` ${classes.hide}`;
		return alertClassNames;
	}, [className, viewAlert, classes]);

	const extendedOnClose = (event: any) => {
		setViewAlert(false);
		if (onClose) onClose(event);
	};

	const getTransitionFadeTime = useCallback(() => {
		return fadeTime ? fadeTime : 4000;
	}, [fadeTime]);

	const clearChildrenProp = useCallback(() => {
		if (setChildren) setTimeout(() => setChildren(""), 400);
	}, [setChildren]);

	const hideAlert = useCallback(() => {
		setViewAlert(false);
		clearChildrenProp();
	}, [clearChildrenProp]);

	useEffect(() => {
		if (children === "" || children === undefined) return;
		setViewAlert(true);
		setTimer((prevTimer) => {
			if (prevTimer) clearTimeout(prevTimer);
			return setTimeout(hideAlert, getTransitionFadeTime());
		});
	}, [children, getTransitionFadeTime, hideAlert]);

	useEffect(() => {
		if (children && !setChildren) {
			throw Error(
				"Cannot use the children property without the setChildren property. See documentation."
			);
		}
	}, [children, setChildren]);

	return (
		<Alert
			id={getId()}
			className={getClassNames()}
			onClose={extendedOnClose}
			{...rest}
		>
			{children}
		</Alert>
	);
};

export default AlertHover;
