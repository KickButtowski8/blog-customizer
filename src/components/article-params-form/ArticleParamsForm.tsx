import { clsx } from 'clsx';
import { useState, useRef, type FormEvent } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  fontSizeOptions,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  /* Настройки открытия/закрытия меню */
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickClose({
    isOpen,
    rootRef,
    onChange: setIsOpen,
  });
  const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };

  const [formState, setFormState] = useState(defaultArticleState);
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };
  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <div ref={rootRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text as="h2" size={31} weight={800} uppercase={true}>
            Задайте параметры
          </Text>
          <div className={styles.settings}>
            <Select
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              placeholder={fontFamilyOptions[0].title}
              onChange={(option) => {
                setFormState({ ...formState, fontFamilyOption: option });
              }}
              title="Шрифт"
            />
            <RadioGroup
              name="font-size"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(option) => {
                setFormState({ ...formState, fontSizeOption: option });
              }}
              title="Размер шрифта"
            />

            <Select
              options={fontColors}
              selected={formState.fontColor}
              placeholder={fontColors[0].title}
              onChange={(option) => {
                setFormState({ ...formState, fontColor: option });
              }}
              title="Цвет шрифта"
            />
            <Separator />
            <Select
              options={backgroundColors}
              selected={formState.backgroundColor}
              placeholder={backgroundColors[0].title}
              onChange={(option) => {
                setFormState({ ...formState, backgroundColor: option });
              }}
              title="Цвет фона"
            />
            <Select
              options={contentWidthArr}
              selected={formState.contentWidth}
              placeholder={contentWidthArr[0].title}
              onChange={(option) => {
                setFormState({ ...formState, contentWidth: option });
              }}
              title="Ширина контента"
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              htmlType="button"
              type="clear"
              onClick={handleReset}
            />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
