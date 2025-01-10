import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AbVariation = {
  __typename?: 'ABVariation';
  percentage: Scalars['Float'];
  target_url: Scalars['String'];
};

export type Link = {
  __typename?: 'Link';
  category: LinkCategory;
  created_at: Scalars['DateTime'];
  details?: Maybe<Scalars['JSON']>;
  link_id: Scalars['ID'];
  original_url?: Maybe<Scalars['ID']>;
  short_url: Scalars['ID'];
  summary: Scalars['ID'];
  updated_at: Scalars['DateTime'];
};

export enum LinkCategory {
  ABTestLink = 'A_B_TEST_LINK',
  CountdownTimerLink = 'COUNTDOWN_TIMER_LINK',
  DeviceSpecificLink = 'DEVICE_SPECIFIC_LINK',
  EmailConfirmationLink = 'EMAIL_CONFIRMATION_LINK',
  EventLink = 'EVENT_LINK',
  ExpiringLink = 'EXPIRING_LINK',
  FunnelLink = 'FUNNEL_LINK',
  GeoTargetedLink = 'GEO_TARGETED_LINK',
  LeadGenerationLink = 'LEAD_GENERATION_LINK',
  OneTimeLink = 'ONE_TIME_LINK',
  PasswordProtectedLink = 'PASSWORD_PROTECTED_LINK',
  PersonalizedNameLink = 'PERSONALIZED_NAME_LINK',
  PollLink = 'POLL_LINK',
  PopUpOfferLink = 'POP_UP_OFFER_LINK',
  PreRollLink = 'PRE_ROLL_LINK',
  QrShortLink = 'QR_SHORT_LINK',
  ReferralLink = 'REFERRAL_LINK',
  RegularLink = 'REGULAR_LINK',
  RetargetingLink = 'RETARGETING_LINK',
  RewardLink = 'REWARD_LINK',
  RotatorLink = 'ROTATOR_LINK',
  ScrollableLink = 'SCROLLABLE_LINK',
  SocialUnlockLink = 'SOCIAL_UNLOCK_LINK',
  SpinTheWeelLink = 'SPIN_THE_WEEL_LINK',
  TimeBasedLink = 'TIME_BASED_LINK',
}

export type Query = {
  __typename?: 'Query';
  links: Array<Link>;
};

export type LinksQueryVariables = Exact<{ [key: string]: never }>;

export type LinksQuery = {
  __typename?: 'Query';
  links: Array<{
    __typename?: 'Link';
    link_id: string;
    short_url: string;
    category: LinkCategory;
    created_at: any;
    updated_at: any;
    details?: any | null;
  }>;
};

export const LinksDocument = gql`
  query links {
    links {
      link_id
      short_url
      category
      created_at
      updated_at
      details
    }
  }
`;

/**
 * __useLinksQuery__
 *
 * To run a query within a React component, call `useLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useLinksQuery(
  baseOptions?: Apollo.QueryHookOptions<LinksQuery, LinksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LinksQuery, LinksQueryVariables>(
    LinksDocument,
    options
  );
}
export function useLinksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LinksQuery, LinksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LinksQuery, LinksQueryVariables>(
    LinksDocument,
    options
  );
}
export type LinksQueryHookResult = ReturnType<typeof useLinksQuery>;
export type LinksLazyQueryHookResult = ReturnType<typeof useLinksLazyQuery>;
export type LinksQueryResult = Apollo.QueryResult<
  LinksQuery,
  LinksQueryVariables
>;
