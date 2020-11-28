import { FormControl, TextField } from '@material-ui/core';
import { throttle } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import * as friendsService from '../apis/FriendsService';
import { ReactComponent as TextSpinnerIcon } from '../assets/icons/text_spinner.svg';
import { FieldValidationState } from '../modal/FirstRecordingModalContent';
import { LoaderContext, LoaderContextInterface } from '../shared/loader/LoaderContext';
import Toasty, { ToastyInput } from '../shared/Toasty';
import { useInput } from '../shared/useInput';
import UserList from '../shared/UserList';
import UserListItemModel from '../shared/UserListItemModel';
import UserListModel from '../shared/UserListModel';
import CardPageWrapper from '../shell/CardPageWrapper';
import DashboardHeader from '../shell/DashboardHeader';
import styles from './DashboardPage.module.css';

function SearchFriendsPage() {
  const { setLoading } = (React.useContext(LoaderContext) as LoaderContextInterface);
  const [leaderboard, setLeaderboard] = useState<UserListModel | null>(null);
  const { value: searchTerm, bind: bindSearchTerm } = useInput('');
  const [fieldValidationState, setFieldValidationState] = useState<FieldValidationState>(FieldValidationState.NON_TOUCHED);
  // const [toasty, setToasty] = useState<ToastyInput | null>(null);
  const [toasty, setToasty] = useState<ToastyInput | null>({ text: `Você está seguindo o Plastico Bomba`, color: 'green' });

  useEffect(() => {
    setLoading(false);
    setInterval(() => {
      if (toasty) {
        setToasty(null);
      } else {
        setToasty({ text: `Você está seguindo o asd`, color: 'green' });
      }
    }, 1000);
  }, [setLoading]);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  }

  const requestForNewFriends = async (newSearchTerm: string) => {
    if (!newSearchTerm || newSearchTerm.length < 3) {
      return;
    }

    setFieldValidationState(FieldValidationState.LOADING);
    try {
      const data = await friendsService.getFriends(newSearchTerm);
      setLeaderboard(data);
      setFieldValidationState(FieldValidationState.VALID);
    } catch (error) {
      setLeaderboard(null);
      setFieldValidationState(FieldValidationState.INVALID);
    }
  }

  const throttled = useRef(throttle(requestForNewFriends, 700));

  useEffect(() => {
    throttled.current(searchTerm);
  }, [searchTerm]);

  const endAdornment = fieldValidationState === FieldValidationState.NON_TOUCHED ? null :
    fieldValidationState === FieldValidationState.INVALID ? null :
      fieldValidationState === FieldValidationState.LOADING ?
        <TextSpinnerIcon className={styles.loaderIcon}></TextSpinnerIcon> :
        fieldValidationState === FieldValidationState.VALID ? null : null;

  const followFn = async (user: UserListItemModel) => {
    await friendsService.actOnFriend(user.id, { follow: true, unfollow: false });
    throttled.current(searchTerm);
    setToasty({ text: `Você está seguindo o ${user.nickname.full}`, color: 'green' });
  }

  const unfollowFn = async (user: UserListItemModel) => {
    await friendsService.actOnFriend(user.id, { follow: false, unfollow: true });
    throttled.current(searchTerm);
  }

  const collapseToasty = () => {
    // setToasty(null);
  }

  return (
    <div>
      <div className={styles.background}></div>
      <DashboardHeader />
      <CardPageWrapper>
        <div className={styles.card}>
          <section>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Buscar amigos</h1>
              <h2 className={styles.description}>Estar próximo dos amigos deixa a experiência do Fale Alguma Coisa muito mais interessante (:</h2>
            </div>
          </section>
          <section>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={styles.searchForm}>
              <FormControl fullWidth component="fieldset">
                <TextField fullWidth label="Nome de guerra" {...bindSearchTerm}
                  InputProps={{ endAdornment }} />
              </FormControl>
            </form>
            {leaderboard ? <UserList list={leaderboard} onFollow={followFn} onUnfollow={unfollowFn} /> : null}
          </section>
        </div>
        {toasty ? <Toasty text={toasty.text} color={toasty.color} done={collapseToasty}></Toasty> : null}
      </CardPageWrapper>
    </div>
  );
}

export default SearchFriendsPage;