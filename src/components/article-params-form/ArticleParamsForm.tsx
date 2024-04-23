import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
} from '../../constants/articleProps';

export type ArticleParamsFormProps = {
	articleParams: ArticleStateType;
};

export const ArticleParamsForm = ({
	articleParams,
}: ArticleParamsFormProps) => {
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

	// Стейты элементов формы
	const [currentFontFamily, setCurrentFontFamily] = useState(
		articleParams.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		articleParams.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		articleParams.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		articleParams.backgroundColor
	);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		articleParams.contentWidth
	);

	// Отправка формы
	function handlerSubmitForm(event: SyntheticEvent) {
		event.preventDefault();
		// TODO Связать изменение с App
		const formData: ArticleStateType = {
			fontFamilyOption: currentFontFamily,
			fontColor: currentFontColor,
			backgroundColor: currentBackgroundColor,
			contentWidth: currentContentWidth,
			fontSizeOption: currentFontSize,
		};

		console.log(formData);
	}

	// Сброс данных формы
	function handlerResetForm() {
		// TODO Связать изменение с App
		setCurrentFontFamily(articleParams.fontFamilyOption);
		setCurrentFontSize(articleParams.fontSizeOption);
		setCurrentFontColor(articleParams.fontColor);
		setCurrentBackgroundColor(articleParams.backgroundColor);
		setCurrentContentWidth(articleParams.contentWidth);
	}

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
				<form className={styles.form} onSubmit={handlerSubmitForm}>
					<Text as={'h2'} weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={currentFontFamily}
						onChange={setCurrentFontFamily}
					/>

					<RadioGroup
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={currentFontSize}
						name={'fonst-size'}
						onChange={setCurrentFontSize}
					/>

					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={currentFontColor}
						onChange={setCurrentFontColor}
					/>

					<Separator />

					<Select
						title={'цвет фона'}
						options={fontColors}
						selected={currentBackgroundColor}
						onChange={setCurrentBackgroundColor}
					/>

					<Select
						title={'цвет контекта'}
						options={contentWidthArr}
						selected={currentContentWidth}
						onChange={setCurrentContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handlerResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
