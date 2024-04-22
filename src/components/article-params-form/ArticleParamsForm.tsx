import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// TODO Реализовать передачу данных в форму
// [ ] Типизировать пропсы
// [ ] Передать дефолтные значения через App (defaultArticleState из articleProps.ts)
// [ ] Заполнить форму дочерними компонентами по макету
// [ ] Подставить дефолтные значения

export const ArticleParamsForm = () => {
	// Храним статус открытия формы
	const [open, setOpen] = useState(false);

	// Закрытие формы при клике вне её области и нажатию на Esc
	const refForm = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!open) return;

		function handleClick(event: MouseEvent) {
			if (
				open &&
				refForm.current &&
				!refForm.current.contains(event.target as HTMLElement)
			) {
				setOpen(!open);
			}
		}

		function handlePressEsc(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				console.log(event.key);
				setOpen(!open);
			}
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handlePressEsc);

		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handlePressEsc);
		};
	}, [open]);

	return (
		<>
			{/* TODO Вынести обработчик клика в отдельную переменную */}
			<ArrowButton
				onClick={() => {
					setOpen(!open);
				}}
				isOpen={open}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}
				ref={refForm}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
